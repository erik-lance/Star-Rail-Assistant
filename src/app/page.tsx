import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
	return <main className='flex flex-col min-h-screen justify-between'>
		<Header />
		<div className="flex flex-col items-center justify-between p-24">



			<div className="flex flex-col flex-1">
				<h1 className="text-6xl font-bold">
					<p>Test</p>
				</h1>
			</div>


		</div>
		<Footer />
	</main>
}
