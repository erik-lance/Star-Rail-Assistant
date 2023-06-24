# Author: @erik-lance
# Description: This script will find the warp history url for Honkai Star Rail and copy it to your clipboard.
# Usage: Run the script and it will copy the url to your clipboard. Paste it into your browser to view your warp history.
# Note: I'm not really a powershell developer so this script is probably not the best. If you have any suggestions, please let me know.
#       I also made sure to add comments to the script so it's easier to understand what's going on.

Add-Type -AssemblyName System.Web
$ProgressPreference = 'SilentlyContinue'

# This function Writes the default error message to the console and exits the script.
# with the missing input parameter.
function Write-ErrorAndExit {
    param(
        [Parameter(Mandatory=$true)]
        [string]$MissingItem
    )
    Write-Host "Unable to find: $MissingItem" -ForegroundColor Red
    Write-Output "Please make sure you have opened the game at least once and opened the warp history."
    Write-Output "- If you have already done this, try restarting the game and running the script again."
    Write-Output "- If you are still having issues, please write an issue on the github page."
    Write-Output "GitHub: https://github.com/erik-lance/Star-Rail-Wish-Counter"
    Write-Output ""
    
    # Exit the script pressing any key
    Write-Host "Press any key to continue..."
    $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp") > $null
    exit
}

# This fucntion finds the game path by searching for "Loading player data from" in the log.
function Find-GamePath {
    param(
        [Parameter(Mandatory=$true)]
        [string]$LogPath
    )

    $log_content = Get-Content $LogPath
    $game_path = ""

    for ($i = 0; $i -lt $log_content.Length; $i++) {
        $line = $log_content[$i]

        if ($line -and $line.startsWith("Loading player data from")) {
            $game_path = $line.replace("Loading player data from ", "")
            $game_path = $game_path.replace("/data.unity3d", "")
            break
        }
    }

    return $game_path
}



# Find Path of Honkai Star Rail
Write-Output "Finding Game Path..."

$app_data = [Environment]::GetFolderPath("ApplicationData")

$log_path = "$appData\..\LocalLow\Cognosphere\Star Rail\Player.log"

# Check if log exists
if (-not (Test-Path $log_path)) 
{
    Write-ErrorAndExit "Log File (Player.log)"
}

$log_content = Get-Content $log_path

# Find game path by searching for "Loading player data from" in the log
# This contains the path to the game's data folder.
$game_path = Find-GamePath -LogPath $log_path

# Check if game path is empty
if ([string]::IsNullOrEmpty($game_path)) 
{
    Write-ErrorAndExit "Game Path"
}
