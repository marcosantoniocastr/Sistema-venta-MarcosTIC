import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Menu } from 'lucide-react'

interface Product {
  id: number;
  name: string;
  stock: number;
  sales: number;
  incoming: number;
  expired: number;
}

export default function Component() {
  const [dashboardName, setDashboardName] = useState("Dashboard Futurista de Inventario")
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Producto A', stock: 100, sales: 20, incoming: 50, expired: 5 },
    { id: 2, name: 'Producto B', stock: 150, sales: 30, incoming: 40, expired: 3 },
    { id: 3, name: 'Producto C', stock: 80, sales: 15, incoming: 30, expired: 2 },
  ])
  const [newProduct, setNewProduct] = useState({ name: '', stock: 0, sales: 0, incoming: 0, expired: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleProductChange = (id: number, field: keyof Product, value: number | string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: typeof value === 'number' ? Math.max(0, value) : value } : product
    ))
  }

  const addNewProduct = () => {
    if (newProduct.name) {
      setProducts([...products, { ...newProduct, id: Date.now() }])
      setNewProduct({ name: '', stock: 0, sales: 0, incoming: 0, expired: 0 })
    }
  }

  const chartData = products.map(({ name, stock, sales }) => ({ name, stock, sales }))

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-300 p-4 sm:p-6 md:p-8 font-mono">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Input
          value={dashboardName}
          onChange={(e) => setDashboardName(e.target.value)}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left text-cyan-400 bg-transparent border-none hover:bg-gray-800 focus:bg-gray-800 transition-colors duration-300 w-full sm:w-auto mb-4 sm:mb-0"
        />
        <Button
          className="sm:hidden bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isMobileMenuOpen ? '' : 'hidden sm:grid'}`}>
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 transition-shadow duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-400">Gestión de Inventario</h2>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-cyan-900/50">
                  <TableHead className="text-cyan-300">Producto</TableHead>
                  <TableHead className="text-cyan-300">Stock</TableHead>
                  <TableHead className="text-cyan-300">Ventas</TableHead>
                  <TableHead className="text-cyan-300">Entradas</TableHead>
                  <TableHead className="text-cyan-300">Vencidos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-cyan-900/30 transition-colors duration-200">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleProductChange(product.id, 'stock', parseInt(e.target.value))}
                        className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400 w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.sales}
                        onChange={(e) => handleProductChange(product.id, 'sales', parseInt(e.target.value))}
                        className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400 w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.incoming}
                        onChange={(e) => handleProductChange(product.id, 'incoming', parseInt(e.target.value))}
                        className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400 w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.expired}
                        onChange={(e) => handleProductChange(product.id, 'expired', parseInt(e.target.value))}
                        className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400 w-full"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2">
            <Input
              placeholder="Nuevo producto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400"
            />
            <Input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
              className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400"
            />
            <Input
              type="number"
              placeholder="Ventas"
              value={newProduct.sales}
              onChange={(e) => setNewProduct({...newProduct, sales: parseInt(e.target.value)})}
              className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400"
            />
            <Input
              type="number"
              placeholder="Entradas"
              value={newProduct.incoming}
              onChange={(e) => setNewProduct({...newProduct, incoming: parseInt(e.target.value)})}
              className="bg-gray-700 text-cyan-300 border-cyan-500 focus:border-cyan-400"
            />
            <Button onClick={addNewProduct} className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-green-500 hover:shadow-green-500/50 transition-shadow duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-400">Gráfica de Stock y Ventas</h2>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c5282" />
                <XAxis dataKey="name" stroke="#4fd1c5" />
                <YAxis stroke="#4fd1c5" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4fd1c5' }}
                  labelStyle={{ color: '#4fd1c5' }}
                />
                <Legend wrapperStyle={{ color: '#4fd1c5' }} />
                <Bar dataKey="stock" fill="#4fd1c5" name="Stock" />
                <Bar dataKey="sales" fill="#48bb78" name="Ventas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center animate-bounce">
        <span className="inline-block px-4 py-2 bg-cyan-900 text-cyan-300 rounded-full text-sm">
          Datos actualizados en tiempo real
        </span>
      </div>
    </div>
  )
}