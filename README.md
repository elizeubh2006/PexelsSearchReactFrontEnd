# Free Image Search Frontend 🎯

Projeto frontend construído em **React + TypeScript**, utilizando arquitetura limpa, grid de imagens, estilização via Tailwind CSS v4, e integração com backend para histórico de pesquisas e imagens da Pexels.

---

## 🧐 Visão Geral  
Este projeto permite ao usuário:
- Digitar uma pesquisa de imagens com autocomplete do histórico.
- Visualizar resultados em um layout tipo “Google Images” (grid responsivo).
- Clicar em uma imagem para abrir em modal, ver autor, resolução e botão de download.  
- Histórico de pesquisas salvo no backend e sugerido no autocomplete conforme digita.

---

## 🖼️ Screenshots  
> *(Insira abaixo prints de tela do projeto em funcionamento)*  
![Screenshot 1](https://i.imgur.com/4ggKTma.png)  
![Screenshot 2](https://i.imgur.com/QMZzAMo.png)  


---

## 🛠 Tecnologias Utilizadas  
- React 18 + TypeScript  
- Tailwind CSS v4  
- Axios para chamadas HTTP  
- Virtualização com react‑cool‑virtual (ou alternativa semelhante)  
- Arquitetura limpa (Clean Architecture) aplicada no frontend  
- Estrutura de pastas modular: components, pages, hooks, types, api  
- Backend (separado) que implementa histórico de pesquisas e consumo da API da Pexels  

---

## 🚀 Instalação & Execução  
1. Clone o repositório:  
   ```bash
   git clone https://github.com/elizeubh2006/PexelsSearchReactFrontEnd.git
   cd free-image-search
   npm install
   npm run dev
   
## 🔍 Como Funciona

1. O usuário digita no campo de pesquisa.  
2. O componente **Autocomplete** consulta o endpoint de histórico conforme o usuário digita.  
3. Ao confirmar (pressionar **Enter** ou clicar na lupa), a busca é disparada.  
4. A página **Home** passa o termo ao componente **ImageList**, que realiza a busca inicial (página 1).  
5. A listagem é exibida em um **grid responsivo**.  
6. Ao clicar em uma imagem, abre-se uma **modal** com detalhes adicionais e opção de **download**.  

---

## 🤝 Contribuição

Sinta-se à vontade para contribuir!  
Basta abrir uma **issue** ou enviar um **pull request** com melhorias.

---

## 🧑‍💻 Autor

**Seu Nome**  
📧 elizeubh2006@gmail.com  
🌐 https://linkedin.com/in/elizeubh2006

---

## 📝 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo LICENSE para mais detalhes.
   
