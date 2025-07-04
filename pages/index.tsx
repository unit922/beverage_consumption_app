import OrderForm from '../components/OrderForm';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Beverage Consumption App</h1>
      <OrderForm />
    </div>
  );
}
