import { ProductsList } from '@/components/ProductsList/ProductsList'
import { ReduxProvider } from '@/redux/provider'

export default function Home() {
  return (
    <main className="container my-5">
      <ReduxProvider>
        <ProductsList />
      </ReduxProvider>
    </main>
  )
}
