"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Send, Trash } from "lucide-react";

interface ListaItem {
  nome: string;
  quantidade: string;
}

export default function Home() {
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [listaDeCompras, setListaDeCompras] = useState<ListaItem[]>([]);

  const adicionarItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (nomeProduto && quantidade) {
      const novoItem: ListaItem = { nome: nomeProduto, quantidade };
      setListaDeCompras([...listaDeCompras, novoItem]);
      setNomeProduto("");
      setQuantidade("");
    }
  };

  const removerItem = (index: number) => {
    const novaLista = [...listaDeCompras];
    novaLista.splice(index, 1);
    setListaDeCompras(novaLista);
  };

  const enviarLista = (e: React.FormEvent) => {
    e.preventDefault();
    const mensagem = `LISTA DE COMPRAS%0A${listaDeCompras
      .map((item) => `${item.nome} = ${item.quantidade}`)
      .join("%0A")}`;
    const url = `https://wa.me/?text=${mensagem}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="w-full p-4 flex items-center justify-between border-b">
        <h1 className="font-bold text-lg">Criar Lista App</h1>
        <ModeToggle />
      </header>
      <main className="p-4 flex flex-col gap-8">
        <form className="flex flex-col gap-4">
          <Input
            placeholder="Nome do produto"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
          <Input
            placeholder="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <Button onClick={adicionarItem}>Adicionar item à lista</Button>
          <Button
            variant="secondary"
            className="flex gap-2"
            onClick={enviarLista}
          >
            Enviar lista <Send size={16} />
          </Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Remover</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listaDeCompras.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.quantidade}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removerItem(index)}
                  >
                    <Trash size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
