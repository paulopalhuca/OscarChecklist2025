import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function OscarChecklist() {
  const [checked, setChecked] = useState({});

  // Load checked items from LocalStorage on mount
  useEffect(() => {
    const savedChecked = localStorage.getItem('oscarChecklist');
    if (savedChecked) {
      setChecked(JSON.parse(savedChecked));
    }
  }, []);

  // Save checked items to LocalStorage when they change
  useEffect(() => {
    localStorage.setItem('oscarChecklist', JSON.stringify(checked));
  }, [checked]);

  const categories = {
    Filmes: [
      'A Garota da Agulha', 'A Semente do Fruto Sagrado', 'A Substância', 'A Verdadeira Dor', 'Ainda Estou Aqui', 'Alien: Romulus', 'Anora', 'Better Man - A História de Robbie Williams', 'Conclave', 'Duna: Parte Dois', 'Emilia Pérez', 'Flow', 'Gladiador II', 'Maria Callas', 'Nickel Boys', 'Nosferatu', 'O Brutalista', 'Planeta dos Macacos: O Reinado', 'Setembro 5', 'Sing Sing', 'Um Completo Desconhecido', 'Um Homem Diferente', 'Wicked'
    ],
    Animações: [
      'Divertida Mente 2', 'Memórias de um Caracol', 'Robô Selvagem', 'Wallace & Gromit: A Vengança'
    ],
    Documentários: [
      'Diários da Caixa Preta', 'No Other Land', 'Porcelain War', 'Sugarcane: Sombras de um Colégio Interno', 'Trilha Sonora Para um Golpe de Estado'
    ],
    Curtas: [
      'A Lien', 'Anuja', 'Beatuitul Men', 'Death by Numbers', 'Estou Pronto, Guarda', 'I’m Not a Robot', 'Incident', 'In the Shadow of the Cypress', 'Instruments of a Beating Heart', 'Magic Candies', 'The Last Ranger', 'The Man Who Could Not Remain Silent', 'Wander to Wonder', 'Yuck!', 'A Única Mulher na Orquestra'
    ]
  };

  const handleCheck = (category, item) => {
    setChecked(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [item]: !prevState[category]?.[item]
      }
    }));
  };

  return (
    <div className='p-4' style={{ backgroundImage: `url(/mnt/data/11C0B531-7B4B-4966-9D5F-B45E0A0CECD4.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className='text-2xl font-bold mb-4'>Oscar 2025 Checklist</h1>
      {Object.entries(categories).map(([category, items]) => (
        <Card key={category} className='mb-6'>
          <h2 className='text-xl font-semibold mb-3'>{category}</h2>
          <CardContent className='grid grid-cols-1 gap-2'>
            {items.map(item => (
              <div key={item} className='flex items-center'>
                <Checkbox
                  checked={checked[category]?.[item] || false}
                  onCheckedChange={() => handleCheck(category, item)}
                  className='mr-2'
                />
                <label>{item}</label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
