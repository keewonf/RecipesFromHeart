import profileImg from "../assets/profilePlaceholder.png";
import bgImg from "../assets/bg-image.jpg";
import { MyRecipes } from "./recipes/MyRecipes";

export function Profile() {
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-3xl">
        <img src={bgImg} alt="" className="h-35 w-full object-cover" />
      </div>
      <div className="-mt-8 flex items-center gap-4 px-4">
        <div className="inline-flex rounded-full bg-white p-1 shadow-[0_6px_20px_rgba(41,27,26,0.16)]">
          <img
            src={profileImg}
            alt="Imagem de perfil"
            className="h-35 w-35 rounded-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-text-primary">Lucas Moura</h1>
        </div>
      </div>
      <p className="mt-3 px-4 text-lg leading-7 text-text-primary">
        Amante de doces e café. Compartilhando minhas receitas caseiras
      </p>
      <MyRecipes showHeader={false} />
    </div>
  );
}
