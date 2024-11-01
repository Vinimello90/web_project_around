# Around the U.S. - EUA Afora

Este é um projeto da Around the U.S. - EUA Afora, destinado ao usuário para adicionar, remove ou curtir fotos. O layout é responsivo, adaptando-se a diferentes tamanhos de tela, utilizando `unidades de medida relativas` e `media queries` para ajustar o design conforme os pontos de interrupção, garantindo que o layout permaneça intacto e não esteja quebrando. Foi usado `javascript` para dar função ao bortão de editar para abrir uma `popup` para editar o perfil alterando o nome, profissão e mostrar uma mensagem quando a galeria dos cartões estiver vazia.

## Tecnologias

- HTML5 semântico
- Metodologia BEM
- Flexbox
- Grid
- Text-overflow
- Hover
- Pseudo-classe
- Unidades de medidas relativas
- Media queries
- Javascript

## Descrição das Tecnologias e Técnicas Utilizadas

### HTML semântico

O `HTML semântico` foi aplicado para tornar o código mais compreensível, enquanto a `metodologia BEM` facilita a manutenção e a compreensão do código.

### Flexbox

O `Flexbox` foi usado juntamente com `unidades de medidas relativas` para organizar e otimizar a responsividade do layout.

### Grid e text-overflow

O `Grid` foi usado nos cartões das fotos da seção gallery para criar um layout mais organizado e melhor distribuido, e usado a propriedade `text-overflow:ellipsis` em conjunto com `overflow:hidden` e `white-space: nowrap` para reduzir os textos maiores que o layout.

- Seção Gallery

<img src="./images/gallery.png" alt="" width="100%">

### Pseudo-classe

Foi aplicado para mudar o estilo a pseudo-classe `:hover` na parte interativa quando o usuário passar o cursor sobre o elemento e a pseudo-classe `:active` quando o elemento for clicado.

<p align="center"><img src="./images/pseudo-classes.png" alt="" width="60%"></p>

### Media Queries

As `media queries` foram implementadas para ajustar o layout de acordo com os pontos de interrupção e garantir a responsividade em várias resoluções de tela. Foram adicionados pontos de interrupção para assegurar a responsividade definidos com base nos intervalos:

- 320-768px (590px, 650px)
- 768-1280px (785px)
- 1280px e acima

<p align="center"><img src="./images//screen-size.png" alt="" width="60%"></p>

### Javascript

No javascript foi usado o método `querySelector()` para selecionar os elementos manipulando o `DOM` para adicionar o método `addEventListener()` aos botões, para manipular as funções de abrir a popup para editar o perfil usando a propriedade `textContent` para manipular e adicionar o conteúdo do perfil nos inputs, salvar as alterações no nome, na profissão e mostrar uma mensagem quando a galeria dos cartões estiver vazia.

- Popup para editar a Seção Profile.

<img src="./images/profile-edit.png" alt="" width="100%">

<br>

- Mensagem que é mostrada quando a galeria dos cartões estiver vazia.

<img src="./images/no-cards.png" alt="" width="100%">

#### Para ver o projeto em execução clique <a href="https://vinimello90.github.io/web_project_around/">aqui</a>.

## Planos de melhoria do projeto

- Adicionar função para adicionar e remover os cartões.
- Adicionar função ao botão de gostei.
