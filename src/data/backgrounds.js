// src/data/backgrounds.js

export const BACKGROUNDS = [
  // ── Gradients ─────────────────────────────────────────────────────
  { id:"midnight",   label:"Midnight",   style:"linear-gradient(145deg,#0f0c29,#302b63,#24243e)",    textColor:"#fff" },
  { id:"royal",      label:"Royal",      style:"linear-gradient(145deg,#2D1B69,#4A3394,#1a0f3d)",    textColor:"#fff" },
  { id:"sunrise",    label:"Sunrise",    style:"linear-gradient(160deg,#7B3F00,#C68642,#FFD166)",    textColor:"#fff" },
  { id:"ocean",      label:"Ocean",      style:"linear-gradient(145deg,#0a1628,#1B4F72,#0d2137)",    textColor:"#fff" },
  { id:"forest",     label:"Forest",     style:"linear-gradient(150deg,#0d2b1a,#1a5c33,#2d7a4f)",    textColor:"#fff" },
  { id:"rose",       label:"Rose",       style:"linear-gradient(140deg,#4a1020,#9b3055,#d4607a)",    textColor:"#fff" },
  { id:"crimson",    label:"Crimson",    style:"linear-gradient(145deg,#4a0000,#8b0000,#3d0000)",    textColor:"#fff" },
  { id:"amber",      label:"Amber",      style:"linear-gradient(140deg,#3d2000,#7a4000,#c07000)",    textColor:"#fff" },
  { id:"slate",      label:"Slate",      style:"linear-gradient(150deg,#1a1a2e,#16213e,#0f3460)",    textColor:"#fff" },
  { id:"jade",       label:"Jade",       style:"linear-gradient(155deg,#0d2b28,#1a5c50,#0a2420)",    textColor:"#fff" },
  { id:"dusk",       label:"Dusk",       style:"linear-gradient(145deg,#2c1654,#8e44ad,#e74c6f)",    textColor:"#fff" },
  { id:"sand",       label:"Sand",       style:"linear-gradient(160deg,#c9a96e,#e8d5a3,#f5ebe0)",    textColor:"#3d2b1f" },
  { id:"steel",      label:"Steel",      style:"linear-gradient(145deg,#1c2b3a,#2d4a6b,#1a3550)",    textColor:"#fff" },
  { id:"ember",      label:"Ember",      style:"linear-gradient(150deg,#3d0e00,#8b2500,#c44b00)",    textColor:"#fff" },
  // ── Solids ────────────────────────────────────────────────────────
  { id:"black",      label:"Black",      style:"#0a0a0a",   textColor:"#fff" },
  { id:"charcoal",   label:"Charcoal",   style:"#1c1917",   textColor:"#fff" },
  { id:"cream",      label:"Cream",      style:"#faf7f2",   textColor:"#1c1917" },
  { id:"white",      label:"White",      style:"#ffffff",   textColor:"#1c1917" },
  { id:"navy",       label:"Navy",       style:"#0a1628",   textColor:"#fff" },
  { id:"terracotta", label:"Terracotta", style:"#c0603a",   textColor:"#fff" },
  { id:"sage",       label:"Sage",       style:"#4a7c59",   textColor:"#fff" },
  { id:"gold",       label:"Gold",       style:"#c9a84c",   textColor:"#1c1917" },
]

export const TEMPLATES = [
  { id:"clean",    label:"Clean",    overlay:null,                                                                              border:false },
  { id:"dimmed",   label:"Dimmed",   overlay:"rgba(0,0,0,0.32)",                                                               border:false },
  { id:"light",    label:"Light",    overlay:"rgba(255,255,255,0.13)",                                                         border:false },
  { id:"framed",   label:"Framed",   overlay:null,                                                                              border:true  },
  { id:"radiant",  label:"Radiant",  overlay:"radial-gradient(ellipse at 50% 40%,rgba(255,220,120,0.18) 0%,transparent 65%)", border:false },
  { id:"vignette", label:"Vignette", overlay:"radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,0.55) 100%)",     border:false },
]

export const POSTER_FONTS = [
  { id:"cormorant",  label:"Cormorant",        css:"'Cormorant Garamond', serif",  sample:"Scripture in elegance"  },
  { id:"playfair",   label:"Playfair",          css:"'Playfair Display', serif",    sample:"Scripture in elegance"  },
  { id:"cinzel",     label:"Cinzel",            css:"'Cinzel', serif",              sample:"SCRIPTURE"              },
  { id:"lora",       label:"Lora",              css:"'Lora', serif",                sample:"Scripture in elegance"  },
  { id:"eb",         label:"EB Garamond",       css:"'EB Garamond', serif",         sample:"Scripture in elegance"  },
  { id:"crimson",    label:"Crimson Pro",       css:"'Crimson Pro', serif",         sample:"Scripture in elegance"  },
  { id:"merriweather",label:"Merriweather",     css:"'Merriweather', serif",        sample:"Scripture in elegance"  },
  { id:"spectral",   label:"Spectral",          css:"'Spectral', serif",            sample:"Scripture in elegance"  },
  { id:"baskerville",label:"Libre Baskerville", css:"'Libre Baskerville', serif",   sample:"Scripture in elegance"  },
  { id:"uncial",     label:"Uncial Antiqua",    css:"'Uncial Antiqua', serif",      sample:"Scripture"              },
]

export const TEXT_ALIGNS = [
  { id:"left",   label:"Left"   },
  { id:"center", label:"Center" },
  { id:"right",  label:"Right"  },
]

// Google Fonts gstatic URLs for canvas download (FontFace API)
// These are the woff2 regular + italic files for each font
export const FONT_URLS = {
  "Cormorant Garamond": [
    { url:"https://fonts.gstatic.com/s/cormorantgaramond/v22/co3YmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/cormorantgaramond/v22/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKxy2ouw.woff2", style:"italic", weight:"400" },
  ],
  "Playfair Display": [
    { url:"https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/playfairdisplay/v37/nuFjD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtA.woff2", style:"italic", weight:"400" },
  ],
  "Cinzel": [
    { url:"https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.woff2", style:"normal", weight:"400" },
  ],
  "Lora": [
    { url:"https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOxE7fSbeoVrA.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/lora/v35/0QI8MX1D_JOxE7fSbeoVpBIR.woff2", style:"italic", weight:"400" },
  ],
  "EB Garamond": [
    { url:"https://fonts.gstatic.com/s/ebgaramond/v26/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUA4J-LQJPG_PT.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/ebgaramond/v26/SlGFmQSNjdsmc35JDF1K5GRwSDo_ZiqSd59pQoJPM7KBt76PLQJPG_PT.woff2", style:"italic", weight:"400" },
  ],
  "Crimson Pro": [
    { url:"https://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm1MP5s.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/crimsonpro/v24/q5uQsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4Ue5s.woff2", style:"italic", weight:"400" },
  ],
  "Merriweather": [
    { url:"https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZMdeX3rsHo.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/merriweather/v30/u-4m0qyriQwlOrhSvowK_l52xwNZWMf6hPvhPQ.woff2", style:"italic", weight:"400" },
  ],
  "Spectral": [
    { url:"https://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9v2s13GY_etWWIJ.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M5knjsS_ulYHs.woff2", style:"italic", weight:"400" },
  ],
  "Libre Baskerville": [
    { url:"https://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0qNZaxM.woff2", style:"normal", weight:"400" },
    { url:"https://fonts.gstatic.com/s/librebaskerville/v14/kmKhZrc3Hgbbcjq75U4uslyuy4kn0pNeYRI4CN2V.woff2", style:"italic", weight:"400" },
  ],
  "Uncial Antiqua": [
    { url:"https://fonts.gstatic.com/s/uncialantiqua/v21/N0bM2S5WOex4OUbESzoESK-i-PfRS5VBBSSF.woff2", style:"normal", weight:"400" },
  ],
}