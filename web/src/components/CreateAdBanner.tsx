import { MagnifyingGlassPlus } from 'phosphor-react';

import * as Dialog from '@radix-ui/react-dialog';
export function CreateAdBanner() {
  return (
    <div className=" pt-1 bg-nlw-gradient mt-8 m-3 rounded-lg self-stretch overflow-hidden">
      <div className="bg-[#2a2636] px-8 py-8 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-bold block">
            Não encontrou o seu duo?
          </strong>
          <span className="text-zinc-300">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger
          className="text-white py-3 px-4 bg-violet-500 hover:bg-violet-600
      rounded-md flex items-center gap-3"
        >
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
