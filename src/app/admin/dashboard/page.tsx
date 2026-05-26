export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6 bg-white">
          <p className="text-sm text-neutral-500">Productos</p>
          <p className="text-3xl font-bold mt-1">—</p>
        </div>
        <div className="rounded-xl border p-6 bg-white">
          <p className="text-sm text-neutral-500">Pedidos</p>
          <p className="text-3xl font-bold mt-1">—</p>
        </div>
        <div className="rounded-xl border p-6 bg-white">
          <p className="text-sm text-neutral-500">Ingresos</p>
          <p className="text-3xl font-bold mt-1">—</p>
        </div>
      </div>
    </div>
  );
}
