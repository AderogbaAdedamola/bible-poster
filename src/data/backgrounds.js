// src/data/backgrounds.js

export const BACKGROUNDS = [
  // Gradients
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
  // Solids
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