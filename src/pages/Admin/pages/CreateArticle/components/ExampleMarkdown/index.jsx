// hook
import { useState } from "react";
import { useSetRecoilState } from "recoil";
// atom
import { openModalState } from "src/recoil";
// marked
import DOMPurify from "dompurify";
import { marked } from "marked";

const ExampleMarkdown = () => {
  const [textMarkdown, setTextMarkdown] = useState(
    `# Titre très important
## Titre important
### Titre moins important
#### Titre encore moins important

<!-- Pour aller à la ligne, ajouter deux espaces après le texte -->
Ceci est une ligne avec un retour manuel.  
Voici une nouvelle ligne.

Ceci est un **texte en gras** et ceci est un *texte en italique*.

Vous pouvez également **combiner les deux** : ***gras et italique***.

Voici un ~~texte barré~~.

### Liste non ordonnée
- Élément 1
- Élément 2
  - Sous-élément
  - Sous-élément
- Élément 3

### Liste ordonnée
1. Premier élément
2. Deuxième élément
    1. Sous-élément 1
    2. Sous-élément 2
3. Troisième élément

### Lien
Voici un [lien vers Google](https://www.google.com "Moteur de recherche").`,
  );

  const setOpenModal = useSetRecoilState(openModalState);

  const getHtmlFromMarkdown = (markdownText) => {
    const rawHtml = marked.parse(markdownText);
    return DOMPurify.sanitize(rawHtml);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 top-0 z-50 h-full w-full p-6 pt-8 lg:p-10"
    >
      <i
        onClick={() => setOpenModal(null)}
        className="fa-solid fa-xmark absolute right-2 top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white pr-[0.5px] pt-0.5 lg:h-7 lg:w-7 lg:text-xl 3xl:right-3 3xl:top-3"
      ></i>

      <div className="h-full overflow-scroll rounded-lg bg-white p-3 lg:overflow-x-hidden lg:px-6 lg:pb-6 3xl:mx-auto 3xl:w-2/3">
        {/* editor */}
        <div className="flex flex-col">
          <label htmlFor="textarea" className="font-bold lg:mb-2">
            Contenu
          </label>

          <textarea
            value={textMarkdown}
            onChange={(e) => setTextMarkdown(e.target.value)}
            id="textarea"
            className="h-72 w-full rounded-xl border border-slate-500 bg-transparent px-3 py-2 focus:outline-[#b0181c] lg:h-[400px]"
          ></textarea>
        </div>

        {/* Preview */}
        <div className="mt-6">
          <label className="mb-1 block font-bold">Prévisualisation</label>

          <div
            className="preview-wrapper overflow-hidden rounded-xl border border-slate-500 px-3 py-2"
            dangerouslySetInnerHTML={{
              __html: getHtmlFromMarkdown(textMarkdown),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ExampleMarkdown;
