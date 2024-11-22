import { defineConfig, presetAttributify, presetUno, presetTypography,presetIcons,presetWebFonts  } from 'unocss'
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    presetIcons({ /* options */ }),
    presetTypography(),
    presetWebFonts({}),
  ],
  rules: [
    ['scrollbar-hide', {
      /* Webkit 浏览器 */
      '-webkit-scrollbar': 'none',
      /* Firefox */
      'scrollbar-width': 'none',
      /* IE 和 Edge */
      '-ms-overflow-style': 'none'
    }],
  ],
})
