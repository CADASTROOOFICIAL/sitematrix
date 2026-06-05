# Design Notes - Matrix 360 Clone

## Estilos Extraídos do Site Original

### Cores Principais
- **Cor Primária (Orange)**: #f04923 (RGB: 240, 73, 35)
- **Cor de Fundo Claro**: #f7f7f7
- **Cor de Texto Padrão**: #000
- **Cor de Fundo**: #fff

### Tipografia
- **Fonte Principal**: Sora (sans-serif)
- Pesos utilizados: 200, 300, 400, 500, 600, 700

### Componentes Principais

#### Energy Benefits Section
- Ícones: 31px x 30px em mobile, 90.75px x 90px em desktop
- Ícone Background: #f04923 (circular)
- Border Radius: 75px
- Texto: Sora, 10px mobile / 27px desktop, weight 300
- Texto Bold: weight 700, color #f04923

#### Platform Section
- Background: Imagem de fundo
- Título: Sora, 15px mobile / 51.75px desktop, weight 200
- Grid: 2 colunas mobile, responsive
- Items: Background #f7f7f7, border-radius 5px mobile / 20px desktop
- Item Height: 52px mobile / 210px desktop

#### Digital Section
- Padding: 40px mobile / 120px desktop
- Título: Sora, 15px mobile / 51.75px desktop, weight 500
- Steps: Flex row mobile (scroll), grid 4 colunas desktop
- Step Card: Background #f7f7f7, border-radius 10px mobile / 18.75px desktop
- Step Number Badge: Background #f04923, color white, border-radius 27px
- Step Number: 10px mobile / 24px desktop

### Breakpoints
- Mobile: < 1200px
- Desktop: >= 1200px
- Tablet: 768px

### Observações Importantes
1. A fonte Sora deve ser carregada via Google Fonts
2. Todas as imagens usam URLs do CDN original
3. Layout é altamente responsivo com mudanças significativas entre mobile e desktop
4. Cor #f04923 é usada como destaque em praticamente todos os componentes
