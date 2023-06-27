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

$log_path = "$app_data\..\LocalLow\Cognosphere\Star Rail\Player.log"

# Check if log exists
if (-not (Test-Path $log_path)) 
{
    Write-ErrorAndExit "Log File (Player.log): $log_path"
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

# ----- Find URL of wish history -----
Write-Output "Finding Wish History..."

# Copy data_2 file to a new file so we can read it
# data_2 is the file that contains the wish history url
Copy-Item -Path "$game_path/webCaches/Cache/Cache_Data/data_2" -Destination "$game_path/webCaches/Cache/Cache_Data/data_2_temp"

# Read the data_2 file in UTF8 format and remove the copied file
$cache_data = Get-Content -Encoding UTF8 -Raw "$game_path/webCaches/Cache/Cache_Data/data_2_temp"
Remove-Item -Path "$game_path/webCaches/Cache/Cache_Data/data_2_temp"

# Split the data_2 file by 1/0/ to get each line
$cache_lines = $cache_data -split '1/0/'
$foundURL = "False"

# Loop through each line and find the line that contains the wish history url
for ($i = 0; $i -lt $cache_lines.Length; $i++) 
{
    $line = $cache_lines[$i]

    # If the line starts with http and contains getGachaLog
    if ($line.StartsWith('http') -and $line.Contains("getGachaLog")) 
    {
        Write-Host "Found Wish History URL!" -ForegroundColor Green
        # Write-Output "URL: $line `n`n" # Uncomment this line to get FULL url

        # Split the line by \0 to get the url
        $url = ($line -split "\0")[0]

        # Make a request to the url and check if the retcode is 0
        $response = Invoke-WebRequest -Uri $url -Method GET -UseBasicParsing -ContentType "application/json" | ConvertFrom-Json

        if ($response.retcode -eq 0) 
        {
            Write-Output $url
            Set-Clipboard -Value $url
            Write-Host "`nWarp History Url has been saved to clipboard. `n" -ForegroundColor Yellow
            $foundURL = "True"

            # Exit the script pressing any key
            Write-Host "Press any key to continue..."
            $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp") > $null
            exit
        }
        else
        {
            Write-ErrorAndExit "Wish History URL + $url"
        }
    }
}

if ($foundURL -eq "False") 
{
    Write-ErrorAndExit "Wish History URL"
}