"use client"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sticker from '@/components/Sticker'
import { Chip, Divider, Stack, ThemeProvider, createTheme } from '@mui/material'
import { FaHistory, FaFileImport } from 'react-icons/fa'
import { BsPersonFill } from 'react-icons/bs'

export default function Home() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#242027',
			},
			secondary: {
				main: '#3D253B',
			},
		}
	})

	return <main className='flex flex-col min-h-screen justify-between'>
		<Header />
		<div className="flex flex-col items-center justify-between p-24">

			<div
				className="flex flex-row items-center justify-center py-2 gap-5"
			>

				<Sticker name="march_thumb" size={200} />
				<Stack>
					<p className="text-6xl font-bold">Welcome to Star Rail Assistant!</p>
					<p className="text-2xl font-thin">A website to help track your warp rolls and view profiles</p>
					<ThemeProvider theme={theme}>
						<Stack
							direction="row"
							spacing={1}
							divider={<Divider orientation="vertical" flexItem />}
						>
							<Chip 
								label="Warp History"
								component="a"
								href="/history"
								clickable 
								color="secondary"
								icon={<FaHistory />}
								sx={{paddingLeft: 1}}
							/>

							<Chip
								label="Import Warps"
								component="a"
								href="/import"
								clickable
								color="secondary"
								icon={<FaFileImport />}
								sx={{paddingLeft: 1}}
							/>

							<Chip
								label="Profiles"
								component="a"
								href="/player"
								clickable
								color="secondary"
								icon={<BsPersonFill />}
								sx={{paddingLeft: 1}}
							/>

						</Stack>
					</ThemeProvider>
				</Stack>
			</div>


		</div>
		<Footer />
	</main>
}
