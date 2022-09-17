import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import toast, { Toaster } from 'react-hot-toast';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { api } from './services/api';

import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api.get<Game[]>('/games').then((resp) => setGames(resp.data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <Toaster />
      <img src={logoImg} alt="e-Sports logo" />
      <h1 className="text-6xl text-white font-black">
        O seu&nbsp;
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>
        &nbsp;está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            _count={game._count}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
