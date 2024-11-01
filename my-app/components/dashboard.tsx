'use client'

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Bell, Calendar, FileText, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type CustomFormData = {
  name: string
  cpf: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  desc: string
}

export function DashboardComponent() {
  const [formData, setFormData] = useState<CustomFormData>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    desc: "",
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3001/create-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        description: formatDescription(formData),
      }),
    })
    console.log(response)
  }

  const formatDescription = (data: CustomFormData) => {
    return `Nome: ${data.name}\nCPF: ${data.cpf}\nEmail: ${data.email}\nTelefone: ${data.phone}\nEndereço: ${data.address}, ${data.city}, ${data.state}, ${data.zip}\nDescrição: ${data.desc}`
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white" onClick={() => setSidebarOpen(false)}>
            <FileText className="mr-2 h-4 w-4" />
            Processos
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white" onClick={() => setSidebarOpen(false)}>
            <Users className="mr-2 h-4 w-4" />
            Clientes
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white" onClick={() => setSidebarOpen(false)}>
            <Calendar className="mr-2 h-4 w-4" />
            Agenda
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Escritório de Advocacia Silva & Associados</h1>
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium mb-6">Dashboard</h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 novos esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximos Agendamentos</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Nos próximos 7 dias</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Notificações</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">13</div>
                  <p className="text-xs text-muted-foreground">5 não lidas</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastro de Cliente</CardTitle>
                  <CardDescription>Preencha os dados do novo cliente</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">CEP</Label>
                        <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc">Descrição</Label>
                      <Textarea id="desc" name="desc" value={formData.desc} onChange={handleChange} required />
                    </div>
                    <Button type="submit" className="w-full">Cadastrar</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendário de Agendamentos</CardTitle>
                  <CardDescription>Visão geral dos próximos compromissos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Componente de calendário será integrado aqui</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Clientes Recentes</CardTitle>
                <CardDescription>Últimos clientes adicionados ou atualizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { name: "Alice Oliveira", email: "alice@email.com" },
                    { name: "Bob Santos", email: "bob@email.com" },
                    { name: "Carol Silva", email: "carol@email.com" },
                  ].map((client) => (
                    <div key={client.email} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${client.name}`} alt={client.name} />
                        <AvatarFallback>{client.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2023 Escritório de Advocacia Silva & Associados. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}