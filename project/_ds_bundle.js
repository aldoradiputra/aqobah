/* @ds-bundle: {"format":3,"namespace":"AqobahDesignSystem_6897ec","components":[{"name":"FacilityItem","sourcePath":"components/brand/FacilityItem.jsx"},{"name":"PackageCard","sourcePath":"components/brand/PackageCard.jsx"},{"name":"PricingTier","sourcePath":"components/brand/PricingTier.jsx"},{"name":"SectionHeading","sourcePath":"components/brand/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/brand/StatBlock.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"}],"sourceHashes":{"components/brand/FacilityItem.jsx":"5db64d630ca2","components/brand/PackageCard.jsx":"dad07ac3c56c","components/brand/PricingTier.jsx":"a00f0ada71b6","components/brand/SectionHeading.jsx":"32ccb921453d","components/brand/StatBlock.jsx":"75f2f857941a","components/core/Badge.jsx":"11d8e9a3f684","components/core/Button.jsx":"de95fc0fc995","components/core/Card.jsx":"f72a73a05628","components/core/Input.jsx":"65f12866f3b4","ui_kits/erp/ErpModules.jsx":"b110f024f0ba","ui_kits/erp/ErpShell.jsx":"c6549b39197c","ui_kits/website/Chrome.jsx":"00387a3f307b","ui_kits/website/HajiKhususScreen.jsx":"1724b83b6892","ui_kits/website/HomeScreen.jsx":"b692dcd8c4ed","ui_kits/website/LayananScreen.jsx":"e2203349158e","ui_kits/website/PackageDetail.jsx":"b61f604b2282"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AqobahDesignSystem_6897ec = window.AqobahDesignSystem_6897ec || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/FacilityItem.jsx
try { (() => {
/**
 * Aqobah FacilityItem — icon tile + title + short description.
 * Used for the haji/umrah facilities grid (Hotel, Muthawif, Maktab VIP, …).
 */
function FacilityItem({
  icon = null,
  title,
  description,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-soft)',
      color: 'var(--brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      margin: 0,
      color: 'var(--text-primary)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, description)));
}
Object.assign(__ds_scope, { FacilityItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/FacilityItem.jsx", error: String((e && e.message) || e) }); }

// components/brand/PricingTier.jsx
try { (() => {
/**
 * Aqobah PricingTier — room-occupancy price tile (Quad / Triple / Double).
 * Mirrors the brochure layout: big IDR figure, USD subline, occupancy label.
 */
function PricingTier({
  price,
  // "270" (juta) — rendered big
  unit = 'Jt',
  usd,
  // "USD 15.500"
  occupancy,
  // "QUAD" | "TRIPLE" | "DOUBLE"
  featured = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: featured ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      border: featured ? '2px solid var(--gold-300)' : '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      transform: featured ? 'translateY(-6px)' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 18px 18px',
      textAlign: 'center',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '2.6rem',
      lineHeight: 1,
      color: 'var(--indigo-700)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: '1rem',
      color: 'var(--indigo-700)'
    }
  }, unit, "'an")), usd && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--brand-primary)',
      marginTop: '6px'
    }
  }, usd)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px',
      textAlign: 'center',
      background: featured ? 'var(--gold-300)' : 'var(--brand-primary)',
      color: featured ? 'var(--indigo-800)' : '#fff',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      letterSpacing: '0.1em'
    }
  }, occupancy));
}
Object.assign(__ds_scope, { PricingTier });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PricingTier.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionHeading.jsx
try { (() => {
/**
 * Aqobah SectionHeading — eyebrow + display title with gold rule.
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  // left | center
  onDark = false,
  style = {}
}) {
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      maxWidth: centered ? '720px' : 'none',
      marginInline: centered ? 'auto' : 0,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--gold-300)' : 'var(--brand-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '22px',
      height: '2px',
      background: 'var(--gold-300)',
      display: 'inline-block',
      borderRadius: '2px'
    }
  }), eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      lineHeight: 'var(--leading-tight)',
      color: onDark ? '#fff' : 'var(--text-primary)',
      margin: 0,
      textWrap: 'balance'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-relaxed)',
      color: onDark ? 'rgba(255,255,255,0.82)' : 'var(--text-secondary)',
      margin: 0,
      maxWidth: '58ch',
      textWrap: 'pretty'
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/brand/StatBlock.jsx
try { (() => {
/**
 * Aqobah StatBlock — headline metric with label (trust / track-record stats).
 */
function StatBlock({
  value,
  label,
  icon = null,
  onDark = false,
  align = 'left',
  style = {}
}) {
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-300)',
      marginBottom: '6px',
      display: 'flex'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-3xl)',
      lineHeight: 1,
      color: onDark ? '#fff' : 'var(--brand-deep)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      letterSpacing: '0.02em',
      color: onDark ? 'rgba(255,255,255,0.78)' : 'var(--text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Aqobah Badge — compact status / category / trust marker.
 */
function Badge({
  children,
  variant = 'neutral',
  // neutral | brand | accent | seal | success | warning | danger
  soft = true,
  icon = null,
  style = {}
}) {
  const palettes = {
    neutral: {
      solid: ['var(--neutral-700)', '#fff'],
      soft: ['var(--neutral-100)', 'var(--neutral-700)']
    },
    brand: {
      solid: ['var(--brand-primary)', '#fff'],
      soft: ['var(--surface-brand-soft)', 'var(--blue-700)']
    },
    accent: {
      solid: ['var(--brand-accent)', 'var(--text-on-accent)'],
      soft: ['var(--gold-50)', 'var(--gold-600)']
    },
    seal: {
      solid: ['var(--brand-seal)', '#fff'],
      soft: ['var(--maroon-100)', 'var(--maroon-600)']
    },
    success: {
      solid: ['var(--success-500)', '#fff'],
      soft: ['var(--success-50)', 'var(--success-500)']
    },
    warning: {
      solid: ['var(--warning-500)', '#fff'],
      soft: ['var(--warning-50)', 'var(--warning-500)']
    },
    danger: {
      solid: ['var(--danger-500)', '#fff'],
      soft: ['var(--danger-50)', 'var(--danger-500)']
    }
  };
  const p = palettes[variant] || palettes.neutral;
  const [bg, fg] = soft ? p.soft : p.solid;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      letterSpacing: '0.03em',
      padding: '4px 11px',
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...style
    }
  }, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Aqobah Button — primary CTA and supporting actions.
 * UI font (IBM Plex Sans), pill radius, soft brand glow on primary.
 */
function Button({
  children,
  variant = 'primary',
  // primary | secondary | ghost | accent | seal
  size = 'md',
  // sm | md | lg
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      font: 'var(--text-sm)',
      gap: '7px'
    },
    md: {
      padding: '12px 24px',
      font: 'var(--text-base)',
      gap: '9px'
    },
    lg: {
      padding: '16px 34px',
      font: 'var(--text-md)',
      gap: '11px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--brand-primary)',
      color: 'var(--text-on-brand)',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-brand)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--brand-primary)',
      border: '1.5px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--brand-primary)',
      border: '1.5px solid transparent',
      boxShadow: 'none'
    },
    accent: {
      background: 'var(--brand-accent)',
      color: 'var(--text-on-accent)',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-gold)'
    },
    seal: {
      background: 'var(--brand-seal)',
      color: '#fff',
      border: '1.5px solid transparent',
      boxShadow: 'var(--shadow-sm)'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: s.font,
      lineHeight: 1,
      padding: s.padding,
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
      letterSpacing: '0.01em',
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/brand/PackageCard.jsx
try { (() => {
/**
 * Aqobah PackageCard — umrah/hajj package offer with image, price, facilities.
 */
function PackageCard({
  title,
  image,
  badge = null,
  // { label, variant }
  duration,
  departure,
  hotelStars = null,
  facilities = [],
  priceLabel = 'Mulai dari',
  price,
  rating = null,
  onSelect,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '180px',
      background: 'var(--surface-sunken)'
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '12px',
      left: '12px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: badge.variant || 'seal',
    soft: false
  }, badge.label)), rating && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: '12px',
      right: '12px',
      background: 'rgba(15,29,43,0.78)',
      color: '#fff',
      backdropFilter: 'blur(4px)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, "\u2605 ", rating)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      margin: 0,
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, duration && /*#__PURE__*/React.createElement("span", null, duration), departure && /*#__PURE__*/React.createElement("span", null, "\xB7 ", departure), hotelStars && /*#__PURE__*/React.createElement("span", null, "\xB7 Hotel ", hotelStars, "\u2605"))), facilities.length > 0 && /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, facilities.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success-500)',
      flex: 'none'
    }
  }, "\u2713"), f))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: '12px',
      paddingTop: '8px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, priceLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-xl)',
      color: 'var(--brand-seal)'
    }
  }, price)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: onSelect
  }, "Pilih Paket"))));
}
Object.assign(__ds_scope, { PackageCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PackageCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Aqobah Card — soft elevated surface container.
 */
function Card({
  children,
  elevation = 'sm',
  // flat | sm | md | lg
  padding = 'md',
  // none | sm | md | lg
  goldTop = false,
  // premium gold hairline along the top edge
  interactive = false,
  style = {},
  ...rest
}) {
  const pads = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  const shadows = {
    flat: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: shadows[elevation] ?? shadows.sm,
      padding: pads[padding] ?? pads.md,
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = shadows[elevation] ?? shadows.sm;
    } : undefined
  }, rest), goldTop && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, var(--gold-300), var(--gold-400))'
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Aqobah Input — labelled text field.
 */
function Input({
  label,
  hint,
  error,
  iconLeft = null,
  id,
  type = 'text',
  style = {},
  ...rest
}) {
  const inputId = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--danger-500)' : focused ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-ui)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '9px',
      background: 'var(--surface-card)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      padding: '0 14px',
      boxShadow: focused ? 'var(--ring-focus)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)',
      padding: '11px 0'
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger-500)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/erp/ErpModules.jsx
try { (() => {
// Aqobah ERP — module screens (dashboard + CRM, Sales, Produk, Ops, Keuangan, HR).

// ---------- DASHBOARD ----------
function ErpDashboard() {
  const {
    Kpi,
    DataTable,
    Pill,
    Panel,
    E_Ico,
    ERP_UNITS
  } = window;
  const unitRevenue = [['Haji Khusus', 62, 'var(--indigo-500)'], ['Umrah', 24, 'var(--blue-500)'], ['Wisata Halal', 9, 'var(--gold-300)'], ['B2B', 5, 'var(--maroon-500)']];
  const departures = [['Umroh Reguler 12H', '24 Sep 2026', 'Jakarta', 42, 45], ['Haji Khusus VIP', '05 Mei 2026', 'Jakarta', 18, 20], ['Umroh Private 9H', '11 Okt 2026', 'Surabaya', 8, 12]];
  const orders = [['#SO-20461', 'H. Sulaiman', 'Haji Khusus VIP', 'Rp 306.000.000', 'green', 'Lunas'], ['#SO-20460', 'Hj. Aminah', 'Umroh Reguler 12H', 'Rp 28.900.000', 'amber', 'Cicilan'], ['#SO-20459', 'Rizky Pratama', 'Umroh Private 9H', 'Rp 47.500.000', 'blue', 'DP'], ['#SO-20458', 'PT Karya Abadi', 'B2B · 30 Tiket', 'Rp 124.000.000', 'green', 'Lunas']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    icon: "Wallet",
    label: "Pendapatan bulan ini",
    value: "Rp 4,82 M",
    delta: "12,4%",
    accent: "var(--brand-primary)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Users",
    label: "Jamaah aktif",
    value: "1.284",
    delta: "8,1%",
    accent: "var(--indigo-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "ShoppingCart",
    label: "Sales order baru",
    value: "96",
    delta: "5,2%",
    accent: "var(--gold-400)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "CircleAlert",
    label: "Pembayaran tertunda",
    value: "Rp 612 Jt",
    delta: "3,0%",
    deltaUp: false,
    accent: "var(--maroon-500)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Pendapatan per Unit Bisnis",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '12px',
        color: 'var(--text-muted)'
      }
    }, "Kuartal berjalan")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, unitRevenue.map(([name, pct, col]) => /*#__PURE__*/React.createElement("div", {
    key: name
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '10px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      background: col,
      borderRadius: 'var(--radius-pill)'
    }
  })))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Keberangkatan Mendatang"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, departures.map(([name, date, dep, sold, cap]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '40px',
      height: '40px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-brand-soft)',
      color: 'var(--brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(E_Ico, {
    name: "PlaneTakeoff",
    size: 18,
    color: "var(--brand-primary)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, date, " \xB7 ", dep)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums'
    }
  }, sold, "/", cap), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-muted)'
    }
  }, "kursi"))))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Sales Order Terbaru",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '13px',
        color: 'var(--brand-primary)',
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "Lihat semua \u2192"),
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'id',
      label: 'Order'
    }, {
      key: 'name',
      label: 'Jamaah / Klien'
    }, {
      key: 'pkg',
      label: 'Paket'
    }, {
      key: 'total',
      label: 'Nilai',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums'
        }
      }, r.total)
    }, {
      key: 'status',
      label: 'Status',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.tone
      }, r.status)
    }],
    rows: orders.map(([id, name, pkg, total, tone, status]) => ({
      id,
      name,
      pkg,
      total,
      tone,
      status
    }))
  })));
}

// ---------- CRM ----------
function ErpCrm() {
  const {
    DataTable,
    Pill,
    Panel,
    Kpi
  } = window;
  const leads = [['Sulaiman Hadi', 'Haji Khusus VIP', 'Instagram', 'seal', 'Booking', '2 jam lalu'], ['Aminah Zahra', 'Umroh Reguler 12H', 'WhatsApp', 'red', 'Hot Lead', 'Hari ini'], ['Rizky Pratama', 'Umroh Private 9H', 'Referral', 'blue', 'Negosiasi', 'Kemarin'], ['Dewi Lestari', 'Wisata Halal Turki', 'Website', 'gold', 'Follow-up', '2 hari lalu'], ['PT Karya Abadi', 'B2B Provider Tiket', 'Sales Visit', 'green', 'Closing', '3 hari lalu'], ['Budi Santoso', 'Haji Khusus Mabrur', 'WhatsApp', 'neutral', 'Lead Baru', '3 hari lalu']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    icon: "UserPlus",
    label: "Lead baru (minggu ini)",
    value: "48",
    accent: "var(--brand-primary)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Flame",
    label: "Hot leads",
    value: "17",
    accent: "var(--maroon-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "CalendarCheck",
    label: "Booking dikonfirmasi",
    value: "29",
    accent: "var(--success-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Percent",
    label: "Conversion rate",
    value: "34%",
    accent: "var(--gold-400)"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Pipeline Jamaah & Klien",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '13px',
        color: 'var(--brand-primary)',
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "+ Tambah Lead"),
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'name',
      label: 'Nama'
    }, {
      key: 'pkg',
      label: 'Minat Paket'
    }, {
      key: 'src',
      label: 'Sumber'
    }, {
      key: 'stage',
      label: 'Tahap',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.tone
      }, r.stage)
    }, {
      key: 'last',
      label: 'Kontak terakhir',
      align: 'right'
    }],
    rows: leads.map(([name, pkg, src, tone, stage, last]) => ({
      name,
      pkg,
      src,
      tone,
      stage,
      last
    }))
  })));
}

// ---------- SALES ----------
function ErpSales() {
  const {
    DataTable,
    Pill,
    Panel,
    Kpi
  } = window;
  const rows = [['#SO-20461', 'H. Sulaiman', 'Haji Khusus VIP', 'Double', 'Rp 306.000.000', 'Rp 306.000.000', 'green', 'Lunas'], ['#SO-20460', 'Hj. Aminah', 'Umroh Reguler 12H', 'Quad', 'Rp 28.900.000', 'Rp 15.000.000', 'amber', 'Cicilan'], ['#SO-20459', 'Rizky Pratama', 'Umroh Private 9H', 'Double', 'Rp 47.500.000', 'Rp 5.000.000', 'blue', 'DP'], ['#SO-20458', 'PT Karya Abadi', 'B2B · 30 Tiket', '—', 'Rp 124.000.000', 'Rp 124.000.000', 'green', 'Lunas'], ['#SO-20457', 'Dewi Lestari', 'Wisata Halal Turki', 'Triple', 'Rp 32.000.000', 'Rp 0', 'red', 'Menunggu DP']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    icon: "Receipt",
    label: "Order bulan ini",
    value: "96",
    delta: "5,2%",
    accent: "var(--brand-primary)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Banknote",
    label: "Nilai order",
    value: "Rp 6,1 M",
    delta: "9,8%",
    accent: "var(--success-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Hourglass",
    label: "Outstanding",
    value: "Rp 612 Jt",
    deltaUp: false,
    delta: "3,0%",
    accent: "var(--maroon-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "CheckCheck",
    label: "Lunas",
    value: "71%",
    accent: "var(--gold-400)"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Daftar Sales Order",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '13px',
        color: 'var(--brand-primary)',
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "+ Order Baru"),
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'id',
      label: 'Order'
    }, {
      key: 'name',
      label: 'Jamaah / Klien'
    }, {
      key: 'pkg',
      label: 'Paket'
    }, {
      key: 'occ',
      label: 'Okupansi'
    }, {
      key: 'total',
      label: 'Total',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums'
        }
      }, r.total)
    }, {
      key: 'paid',
      label: 'Terbayar',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-secondary)',
          fontVariantNumeric: 'tabular-nums'
        }
      }, r.paid)
    }, {
      key: 'status',
      label: 'Status',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.tone
      }, r.status)
    }],
    rows: rows.map(([id, name, pkg, occ, total, paid, tone, status]) => ({
      id,
      name,
      pkg,
      occ,
      total,
      paid,
      tone,
      status
    }))
  })));
}

// ---------- PRODUCTS ----------
function ErpProducts() {
  const {
    Pill,
    Panel
  } = window;
  const products = [['Haji Khusus VIP', 'Haji Khusus', 'Rp 270–306 Jt', '18/20', 'seal'], ['Haji Khusus Premium', 'Haji Khusus', 'Rp 230–270 Jt', '12/20', 'seal'], ['Haji Khusus Mabrur', 'Haji Khusus', 'Rp 190–220 Jt', '9/20', 'seal'], ['Umroh Reguler 12 Hari', 'Umrah', 'Rp 28,9 Jt', '42/45', 'blue'], ['Umroh Private 9 Hari', 'Umrah', 'Rp 47,5 Jt', '8/12', 'blue'], ['Wisata Halal Turki', 'Wisata Halal', 'Rp 32 Jt', '15/30', 'gold']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    }
  }, products.map(([name, unit, price, seats, tone]) => {
    const [sold, cap] = seats.split('/').map(Number);
    const pct = Math.round(sold / cap * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: name,
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '10px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.1rem',
        margin: 0
      }
    }, name), /*#__PURE__*/React.createElement(Pill, {
      tone: tone
    }, unit)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.3rem',
        color: 'var(--brand-seal)'
      }
    }, price), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'var(--text-muted)',
        marginBottom: '5px'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Kursi terisi"), /*#__PURE__*/React.createElement("span", null, seats)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '8px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-sunken)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + '%',
        height: '100%',
        background: pct > 85 ? 'var(--danger-500)' : 'var(--success-500)',
        borderRadius: 'var(--radius-pill)'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '8px',
        marginTop: '2px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        fontFamily: 'var(--font-ui)',
        fontSize: '13px',
        fontWeight: 600,
        padding: '9px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-default)',
        background: 'var(--surface-card)',
        color: 'var(--text-secondary)',
        cursor: 'pointer'
      }
    }, "Detail"), /*#__PURE__*/React.createElement("button", {
      style: {
        flex: 1,
        fontFamily: 'var(--font-ui)',
        fontSize: '13px',
        fontWeight: 600,
        padding: '9px',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: 'var(--brand-primary)',
        color: '#fff',
        cursor: 'pointer'
      }
    }, "Kelola")));
  }));
}

// ---------- OPERATIONS ----------
function ErpOps() {
  const {
    Panel,
    Pill,
    DataTable
  } = window;
  const docs = [['Sulaiman Hadi', 'Haji Khusus VIP', 'green', 'green', 'green', 'amber'], ['Aminah Zahra', 'Umroh Reguler 12H', 'green', 'green', 'amber', 'neutral'], ['Rizky Pratama', 'Umroh Private 9H', 'green', 'amber', 'neutral', 'neutral'], ['Dewi Lestari', 'Wisata Halal Turki', 'green', 'green', 'green', 'green']];
  const mark = t => t === 'green' ? 'Lengkap' : t === 'amber' ? 'Proses' : 'Belum';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Checklist Dokumen Jamaah",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '12px',
        color: 'var(--text-muted)'
      }
    }, "Paspor \xB7 Visa \xB7 Vaksin \xB7 Manasik"),
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'name',
      label: 'Jamaah'
    }, {
      key: 'pkg',
      label: 'Paket'
    }, {
      key: 'paspor',
      label: 'Paspor',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.paspor
      }, mark(r.paspor))
    }, {
      key: 'visa',
      label: 'Visa',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.visa
      }, mark(r.visa))
    }, {
      key: 'vaksin',
      label: 'Vaksin',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.vaksin
      }, mark(r.vaksin))
    }, {
      key: 'manasik',
      label: 'Manasik',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.manasik
      }, mark(r.manasik))
    }],
    rows: docs.map(([name, pkg, paspor, visa, vaksin, manasik]) => ({
      name,
      pkg,
      paspor,
      visa,
      vaksin,
      manasik
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Jadwal Manasik"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, [['Manasik Akbar Umroh', '28 Sep 2026', 'Aula Kantor Pusat'], ['Bimbingan Haji Khusus', '02 Apr 2026', 'Hotel Santika BSD'], ['Manasik Private Group', '05 Okt 2026', 'Online · Zoom']].map(([t, d, loc]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      paddingBottom: '12px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '46px',
      textAlign: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.1rem',
      color: 'var(--brand-primary)'
    }
  }, d.split(' ')[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, d.split(' ')[1])), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: 600
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, loc)))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Vendor & Logistik"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, [['Hotel Swiss Al Maqam', 'Makkah · 20 kamar', 'green', 'Confirmed'], ['Qatar Airways', '45 seat · CGK–JED', 'green', 'Ticketed'], ['Bus AC Armada', '3 unit · Madinah', 'amber', 'Pending'], ['Catering Maktab', 'Arafah–Mina', 'blue', 'Booked']].map(([v, d, tone, st]) => /*#__PURE__*/React.createElement("div", {
    key: v,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: 600
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, d)), /*#__PURE__*/React.createElement(Pill, {
    tone: tone
  }, st)))))));
}

// ---------- FINANCE ----------
function ErpFinance() {
  const {
    Kpi,
    Panel,
    DataTable,
    Pill
  } = window;
  const ledger = [['12 Jun', 'Pelunasan SO-20461', 'Haji Khusus', 'in', 'Rp 291.000.000'], ['11 Jun', 'DP Umroh Private SO-20459', 'Umrah', 'in', 'Rp 5.000.000'], ['10 Jun', 'Pembayaran Hotel Movenpick', 'Haji Khusus', 'out', 'Rp 480.000.000'], ['09 Jun', 'Tiket Qatar Airways (45 pax)', 'Umrah', 'out', 'Rp 720.000.000'], ['08 Jun', 'Invoice B2B PT Karya Abadi', 'B2B', 'in', 'Rp 124.000.000']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    icon: "TrendingUp",
    label: "Pemasukan (MTD)",
    value: "Rp 4,82 M",
    delta: "12,4%",
    accent: "var(--success-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "TrendingDown",
    label: "Pengeluaran (MTD)",
    value: "Rp 3,15 M",
    delta: "6,7%",
    deltaUp: false,
    accent: "var(--maroon-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "PiggyBank",
    label: "Laba kotor",
    value: "Rp 1,67 M",
    delta: "18,2%",
    accent: "var(--brand-primary)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "FileClock",
    label: "Piutang jatuh tempo",
    value: "Rp 612 Jt",
    accent: "var(--gold-400)"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Buku Kas & Bank",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '13px',
        color: 'var(--brand-primary)',
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "Ekspor"),
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'date',
      label: 'Tanggal'
    }, {
      key: 'desc',
      label: 'Keterangan'
    }, {
      key: 'unit',
      label: 'Unit',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.unit === 'Haji Khusus' ? 'seal' : r.unit === 'Umrah' ? 'blue' : 'gold'
      }, r.unit)
    }, {
      key: 'amount',
      label: 'Jumlah',
      align: 'right',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          color: r.dir === 'in' ? 'var(--success-500)' : 'var(--danger-500)'
        }
      }, r.dir === 'in' ? '+ ' : '− ', r.amount)
    }],
    rows: ledger.map(([date, desc, unit, dir, amount]) => ({
      date,
      desc,
      unit,
      dir,
      amount
    }))
  })));
}

// ---------- HR ----------
function ErpHr() {
  const {
    Kpi,
    Panel,
    DataTable,
    Pill
  } = window;
  const staff = [['Ahmad Najihan Maududi', 'Asatidz Pembimbing', 'Operasional', 'green', 'Aktif'], ['Chairul Anwar', 'Asatidz Pembimbing', 'Operasional', 'green', 'Aktif'], ['Ahmad Masyhuri', 'Muthawif Senior', 'Operasional', 'blue', 'Bertugas'], ['Siti Rahmawati', 'Sales Consultant', 'Sales & CRM', 'green', 'Aktif'], ['Fauzan Akbar', 'Finance Officer', 'Keuangan', 'green', 'Aktif'], ['Nurul Hidayah', 'Customer Care', 'Layanan', 'amber', 'Cuti']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    icon: "Users",
    label: "Total karyawan",
    value: "64",
    accent: "var(--brand-primary)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "UserCheck",
    label: "Hadir hari ini",
    value: "58",
    accent: "var(--success-500)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Plane",
    label: "Bertugas di tanah suci",
    value: "6",
    accent: "var(--gold-400)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "Building",
    label: "Cabang & mitra",
    value: "40",
    accent: "var(--indigo-500)"
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "Direktori Karyawan & Tim Lapangan",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '13px',
        color: 'var(--brand-primary)',
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "+ Tambah"),
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(DataTable, {
    columns: [{
      key: 'name',
      label: 'Nama',
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'var(--surface-deep)',
          color: 'var(--gold-300)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 700
        }
      }, r.name.split(' ').map(w => w[0]).slice(0, 2).join('')), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 600
        }
      }, r.name))
    }, {
      key: 'role',
      label: 'Jabatan'
    }, {
      key: 'dept',
      label: 'Divisi'
    }, {
      key: 'status',
      label: 'Status',
      render: r => /*#__PURE__*/React.createElement(Pill, {
        tone: r.tone
      }, r.status)
    }],
    rows: staff.map(([name, role, dept, tone, status]) => ({
      name,
      role,
      dept,
      tone,
      status
    }))
  })));
}
Object.assign(window, {
  ErpDashboard,
  ErpCrm,
  ErpSales,
  ErpProducts,
  ErpOps,
  ErpFinance,
  ErpHr
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/erp/ErpModules.jsx", error: String((e && e.message) || e) }); }

// ui_kits/erp/ErpShell.jsx
try { (() => {
// Aqobah ERP — admin shell (sidebar + topbar) and shared UI helpers.
const ERP_NAV = [['LayoutDashboard', 'Dashboard', 'dashboard'], ['Users', 'CRM', 'crm'], ['ShoppingCart', 'Sales Order', 'sales'], ['Package', 'Produk', 'products'], ['ClipboardCheck', 'Operasional', 'ops'], ['Wallet', 'Keuangan', 'finance'], ['UserCog', 'SDM / HR', 'hr']];
const ERP_UNITS = ['Umrah', 'Haji Khusus', 'Wisata Halal', 'B2B'];
function E_Ico({
  name,
  size = 18,
  color
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide && lucide[name]) {
      ref.current.innerHTML = '';
      ref.current.appendChild(lucide.createElement(lucide[name]));
      const s = ref.current.querySelector('svg');
      if (s) {
        s.setAttribute('width', size);
        s.setAttribute('height', size);
        s.setAttribute('stroke-width', 1.8);
        if (color) s.setAttribute('stroke', color);
      }
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'flex'
    }
  });
}
function ErpShell({
  active,
  onNav,
  title,
  subtitle,
  actions,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--surface-page)',
      fontFamily: 'var(--font-ui)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: '248px',
      flex: 'none',
      background: 'var(--surface-deep)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mark-globe.png",
    alt: "",
    style: {
      height: '32px'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.15rem',
      lineHeight: 1
    }
  }, "AQOBAH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      marginTop: '2px'
    }
  }, "ERP Console"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      padding: '14px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      flex: 1
    }
  }, ERP_NAV.map(([ic, label, key]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    onClick: () => onNav(key),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '11px 14px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: active === key ? 600 : 500,
      background: active === key ? 'rgba(255,255,255,0.12)' : 'transparent',
      color: active === key ? '#fff' : 'rgba(255,255,255,0.72)',
      borderLeft: active === key ? '3px solid var(--gold-300)' : '3px solid transparent'
    }
  }, /*#__PURE__*/React.createElement(E_Ico, {
    name: ic,
    color: active === key ? '#FCB017' : 'rgba(255,255,255,0.72)'
  }), label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      background: 'var(--gold-300)',
      color: 'var(--indigo-800)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '14px'
    }
  }, "AD"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Admin Pusat"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'rgba(255,255,255,0.6)'
    }
  }, "Kantor Pusat \xB7 Tangsel")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: '68px',
      flex: 'none',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.4rem',
      margin: 0,
      lineHeight: 1.1
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      marginTop: '1px'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 14px',
      width: '240px'
    }
  }, /*#__PURE__*/React.createElement(E_Ico, {
    name: "Search",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)'
    }
  }, "Cari jamaah, order\u2026")), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'relative',
      background: 'var(--surface-sunken)',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(E_Ico, {
    name: "Bell",
    size: 18,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '8px',
      right: '9px',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'var(--danger-500)',
      border: '2px solid var(--surface-card)'
    }
  })), actions), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: '28px',
      minWidth: 0
    }
  }, children)));
}

// ---- shared helpers ----
function Kpi({
  icon,
  label,
  value,
  delta,
  deltaUp = true,
  accent = 'var(--brand-primary)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '38px',
      height: '38px',
      borderRadius: 'var(--radius-sm)',
      background: 'color-mix(in srgb, ' + accent + ' 12%, white)',
      color: accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(E_Ico, {
    name: icon,
    size: 19,
    color: accent
  })), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      fontWeight: 600,
      color: deltaUp ? 'var(--success-500)' : 'var(--danger-500)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px'
    }
  }, deltaUp ? '▲' : '▼', " ", delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.6rem',
      lineHeight: 1.1,
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      marginTop: '5px'
    }
  }, label));
}
function DataTable({
  columns,
  rows
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-sunken)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '13px 18px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: '13px 18px',
      textAlign: c.align || 'left',
      color: 'var(--text-primary)',
      whiteSpace: c.wrap ? 'normal' : 'nowrap',
      verticalAlign: 'middle'
    }
  }, c.render ? c.render(r) : r[c.key])))))));
}
function Pill({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: ['var(--neutral-100)', 'var(--neutral-700)'],
    blue: ['var(--blue-50)', 'var(--blue-700)'],
    gold: ['var(--gold-50)', 'var(--gold-600)'],
    green: ['var(--success-50)', 'var(--success-500)'],
    amber: ['var(--warning-50)', 'var(--warning-500)'],
    red: ['var(--danger-50)', 'var(--danger-500)'],
    seal: ['var(--maroon-100)', 'var(--maroon-600)']
  };
  const [bg, fg] = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      fontSize: '12px',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, children);
}
function Panel({
  title,
  action,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.05rem',
      margin: 0
    }
  }, title), action), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px'
    }
  }, children));
}
Object.assign(window, {
  ErpShell,
  Kpi,
  DataTable,
  Pill,
  Panel,
  E_Ico,
  ERP_UNITS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/erp/ErpShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
// Aqobah marketing site — shared chrome (header + footer). Exposes to window.
function SiteHeader({
  onNav,
  active
}) {
  const {
    Button
  } = window.AqobahDesignSystem_6897ec;
  const links = [['Beranda', 'home'], ['Haji Khusus', 'hajj'], ['Paket Umroh', 'packages'], ['Pendanaan & B2B', 'layanan'], ['Kontak', 'contact']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      height: '74px',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mark-globe.png",
    alt: "Aqobah",
    style: {
      height: '40px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.5rem',
      color: 'var(--brand-primary)',
      letterSpacing: '0.01em'
    }
  }, "AQOBAH")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: '4px',
      marginLeft: 'var(--space-5)'
    }
  }, links.map(([label, key]) => /*#__PURE__*/React.createElement("a", {
    key: key,
    onClick: () => onNav(key),
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: active === key ? 600 : 500,
      color: active === key ? 'var(--brand-primary)' : 'var(--text-secondary)',
      cursor: 'pointer',
      padding: '8px 14px',
      borderRadius: 'var(--radius-pill)',
      background: active === key ? 'var(--surface-brand-soft)' : 'transparent',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, "+62 811-1805-330"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNav('contact')
  }, "Konsultasi Gratis"))));
}
function SiteFooter({
  onNav
}) {
  const cols = [['Layanan', ['Umroh Reguler', 'Umroh Private', 'Haji Khusus', 'Provider Visa']], ['Perusahaan', ['Tentang Kami', 'Legalitas & Izin', 'Mitra & Cabang', 'Karier']], ['Bantuan', ['Hubungi Kami', 'Pertanyaan Umum', 'Jadwal Keberangkatan', 'Panduan Manasik']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-deep)',
      color: 'rgba(255,255,255,0.82)',
      marginTop: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-6) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mark-globe.png",
    alt: "Aqobah",
    style: {
      height: '40px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.4rem',
      color: '#fff'
    }
  }, "AQOBAH")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.7,
      maxWidth: '34ch',
      margin: '0 0 16px'
    }
  }, "Penyelenggara Ibadah Haji Khusus & Umrah. Santun & Amanah sejak 2011 \u2014 Akreditasi A."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: '11px',
      fontWeight: 600,
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,0.1)'
    }
  }, "PIHK 610"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: '11px',
      fontWeight: 600,
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(255,255,255,0.1)'
    }
  }, "PPIU 579"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: '11px',
      fontWeight: 600,
      padding: '5px 11px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gold-300)',
      color: 'var(--indigo-800)'
    }
  }, "Akreditasi A"))), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--gold-300)',
      marginBottom: '14px'
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav && onNav('packages'),
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,0.8)',
      cursor: 'pointer'
    }
  }, it))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid rgba(255,255,255,0.12)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'rgba(255,255,255,0.6)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 PT. IBS Buana Sejahtera \xB7 Tangerang Selatan"), /*#__PURE__*/React.createElement("span", null, "info@aqobah.com \xB7 #SantunAmanah"))));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HajiKhususScreen.jsx
try { (() => {
// Aqobah — Haji Khusus product page (real brochure data).
const HAJI_PACKAGES = {
  vip: {
    name: 'VIP',
    tagline: 'Fasilitas tertinggi, hotel bintang 5 dua kota',
    hotels: [['Makkah', 'Swiss Al Maqam', 5], ['Madinah', 'Movenpick', 5], ['Jeddah', 'Mercure', 4]],
    tiers: [['270', 'USD 15.500', 'QUAD'], ['288', 'USD 16.500', 'TRIPLE'], ['306', 'USD 17.500', 'DOUBLE']]
  },
  premium: {
    name: 'Premium',
    tagline: 'Hotel Makkah bintang 5, nilai terbaik',
    hotels: [['Makkah', 'Anjum', 5], ['Madinah', 'Saja', 4], ['Jeddah', 'Mercure', 4]],
    tiers: [['230', 'USD 13.500', 'QUAD'], ['250', 'USD 14.500', 'TRIPLE'], ['270', 'USD 15.500', 'DOUBLE']]
  },
  mabrur: {
    name: 'Mabrur',
    tagline: 'Paket hemat, tetap nyaman & lengkap',
    hotels: [['Makkah', 'Ajyad Makarem', 4], ['Madinah', 'Grand Plaza', 4], ['Jeddah', 'Mercure', 4]],
    tiers: [['190', 'USD 11.000', 'QUAD'], ['200', 'USD 12.000', 'TRIPLE'], ['220', 'USD 13.000', 'DOUBLE']]
  }
};
const FACILITIES = [['BedDouble', 'Hotel', 'Penginapan nyaman berfasilitas lengkap, memastikan kenyamanan selama beribadah.'], ['UserCheck', 'Muthawif', 'Pendamping jamaah berpengalaman membimbing sesuai sunnah sepanjang perjalanan.'], ['Crown', 'Maktab VIP', 'Layanan eksklusif di maktab dengan fasilitas premium dan layanan khusus.'], ['Stethoscope', 'Dokter Pribadi', 'Layanan kesehatan dengan dokter pribadi yang siap menjaga kondisi jamaah.'], ['Plane', 'Tiket Pesawat', 'Penerbangan nyaman dan tepat waktu dengan maskapai internasional terbaik.'], ['UtensilsCrossed', 'Konsumsi', 'Makanan halal dan bergizi yang mendukung kebutuhan jamaah selama ibadah.'], ['Building2', 'Apartemen Transit', 'Apartemen nyaman untuk transit sebelum puncak haji, fasilitas lengkap.'], ['Bus', 'Bus AC', 'Transportasi ber-AC untuk kenyamanan perjalanan antara tempat ibadah dan akomodasi.'], ['BookOpenText', 'Asatidz Pembimbing', 'Bimbingan ibadah oleh asatidz bersertifikat sepanjang rangkaian manasik.']];
const ASATIDZ = ['Ustadz Ahmad Najihan Maududi, S.S.I., MA', 'Ustadz Chairul Anwar', 'Ustadz Ahmad Masyhuri'];
const AIRLINES = ['Qatar Airways', 'Emirates', 'Saudia'];
function HK_Ico({
  name,
  size = 22
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide && lucide[name]) {
      ref.current.innerHTML = '';
      ref.current.appendChild(lucide.createElement(lucide[name]));
      const s = ref.current.querySelector('svg');
      if (s) {
        s.setAttribute('width', size);
        s.setAttribute('height', size);
        s.setAttribute('stroke-width', 1.7);
      }
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'flex'
    }
  });
}
function Stars({
  n
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-400)',
      fontSize: '0.8em',
      letterSpacing: '1px'
    }
  }, '★'.repeat(n));
}
function HajiKhususScreen({
  onNav
}) {
  const {
    Button,
    Badge,
    Card,
    SectionHeading,
    PricingTier
  } = window.AqobahDesignSystem_6897ec;
  const [tier, setTier] = React.useState('vip');
  const pkg = HAJI_PACKAGES[tier];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img-arafah.jpg",
    alt: "Jamaah di Arafah",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(15,29,43,0.86) 0%, rgba(20,34,66,0.62) 55%, rgba(15,29,43,0.5) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '660px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '22px',
      height: '2px',
      background: 'var(--gold-300)',
      borderRadius: '2px'
    }
  }), "#LebihCepatDanNyamanBerhaji"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-4xl)',
      lineHeight: 1.06,
      color: '#fff',
      margin: 0
    }
  }, "Haji Khusus"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'rgba(255,255,255,0.9)',
      margin: 0,
      maxWidth: '56ch'
    }
  }, "Paket perjalanan haji dengan visa resmi pemerintah Indonesia \u2014 waktu tunggu lebih cepat ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--gold-300)'
    }
  }, "5\u20139 tahun"), " dan jauh lebih nyaman dibanding haji reguler."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '4px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "seal",
    soft: false
  }, "PIHK 610"), /*#__PURE__*/React.createElement(Badge, {
    variant: "accent",
    soft: false
  }, "DP USD 5.000"), /*#__PURE__*/React.createElement(Badge, {
    variant: "brand",
    soft: false
  }, "Kuota Resmi Terbatas"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Apa itu Haji Khusus?",
    title: "Lebih cepat berangkat, lebih nyaman beribadah",
    subtitle: "Kami menawarkan paket haji khusus dengan fasilitas terbaik untuk memenuhi kebutuhan dan kenyamanan Anda. Temukan paket yang tepat untuk Anda.",
    align: "center"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      marginBottom: 'var(--space-6)'
    }
  }, Object.keys(HAJI_PACKAGES).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setTier(k),
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      cursor: 'pointer',
      padding: '11px 26px',
      borderRadius: 'var(--radius-pill)',
      border: '1.5px solid',
      borderColor: tier === k ? 'var(--brand-primary)' : 'var(--border-default)',
      background: tier === k ? 'var(--brand-primary)' : 'var(--surface-card)',
      color: tier === k ? '#fff' : 'var(--text-secondary)',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, "Haji Khusus ", HAJI_PACKAGES[k].name))), /*#__PURE__*/React.createElement(Card, {
    elevation: "lg",
    padding: "lg",
    goldTop: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 'var(--space-7)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      margin: 0,
      color: 'var(--indigo-700)'
    }
  }, "Haji Khusus ", pkg.name), tier === 'vip' && /*#__PURE__*/React.createElement(Badge, {
    variant: "accent",
    soft: false
  }, "Terlaris")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      color: 'var(--text-secondary)',
      margin: '0 0 20px',
      fontSize: 'var(--text-base)'
    }
  }, pkg.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, pkg.hotels.map(([city, hotel, stars]) => /*#__PURE__*/React.createElement("div", {
    key: city,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      paddingBottom: '12px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      color: 'var(--brand-primary)'
    }
  }, /*#__PURE__*/React.createElement(HK_Ico, {
    name: "MapPin",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Hotel ", city), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)'
    }
  }, hotel, " ", /*#__PURE__*/React.createElement(Stars, {
    n: stars
  }), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 400,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "/ setaraf"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      color: 'var(--brand-primary)'
    }
  }, /*#__PURE__*/React.createElement(HK_Ico, {
    name: "Building2",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)'
    }
  }, "Apartment Transit \xB7 Maktab VIP")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '14px',
      alignItems: 'end'
    }
  }, pkg.tiers.map(([p, u, o], i) => /*#__PURE__*/React.createElement(PricingTier, {
    key: o,
    price: p,
    usd: u,
    occupancy: o,
    featured: i === 1
  }))), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '18px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '7px'
    }
  }, ['Harga rupiah dihitung dengan kurs 17.500', 'Harga final dihitung kembali pada tahun keberangkatan', 'Fasilitas & program dapat menyesuaikan tahun keberangkatan'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: '8px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2022"), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      marginTop: '18px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNav('contact')
  }, "Daftar Sekarang"), /*#__PURE__*/React.createElement(Button, {
    variant: "seal",
    onClick: () => onNav('contact')
  }, "Tanya Kuota"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '18px',
      marginTop: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, "Maskapai:"), AIRLINES.map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--indigo-600)',
      padding: '8px 16px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, a)))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Fasilitas Haji Khusus",
    title: "Sembilan layanan untuk ketenangan ibadah Anda",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-6) var(--space-7)',
      marginTop: 'var(--space-7)'
    }
  }, FACILITIES.map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-soft)',
      color: 'var(--brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(HK_Ico, {
    name: ic
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      margin: '0 0 4px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Asatidz Pembimbing",
    title: "Dibimbing oleh para asatidz tepercaya",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-7)'
    }
  }, ASATIDZ.map(name => /*#__PURE__*/React.createElement(Card, {
    key: name,
    elevation: "sm",
    padding: "lg",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      margin: '0 auto 14px',
      background: 'var(--surface-deep)',
      color: 'var(--gold-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(HK_Ico, {
    name: "UserRound",
    size: 28
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      color: 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--brand-primary)',
      marginTop: '4px',
      letterSpacing: '0.04em'
    }
  }, "Pembimbing Haji Khusus"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-deep)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-8)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '18px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(100% 120% at 80% 0%, rgba(252,176,23,0.16), rgba(0,0,0,0))'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      color: '#fff',
      margin: 0,
      maxWidth: '20ch'
    }
  }, "Segera Daftar, Kuota Terbatas!"), /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-body)',
      color: 'rgba(255,255,255,0.82)',
      margin: 0
    }
  }, "Hubungi tim haji khusus kami: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--gold-300)'
    }
  }, "0813-8996-2073")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav('contact')
  }, "Konsultasi Gratis")))));
}
Object.assign(window, {
  HajiKhususScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HajiKhususScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Aqobah marketing site — Home screen sections.
const PACKAGES = [{
  id: 'reg12',
  title: 'Umroh Reguler 12 Hari',
  image: '../../assets/img-kaaba.jpg',
  badge: {
    label: 'Best Seller',
    variant: 'accent'
  },
  duration: '12 Hari',
  departure: 'Jakarta',
  hotelStars: 4,
  facilities: ['Hotel ⭐4 dekat Masjidil Haram', 'Pembimbing bersertifikat', 'Maskapai resmi PP'],
  price: 'Rp 28.900.000',
  rating: '4.9'
}, {
  id: 'priv9',
  title: 'Umroh Private 9 Hari',
  image: '../../assets/img-madinah.jpg',
  badge: {
    label: 'VIP',
    variant: 'seal'
  },
  duration: '9 Hari',
  departure: 'Jakarta · Surabaya',
  hotelStars: 5,
  facilities: ['Hotel ⭐5 view Haram', 'Muthawif pribadi', 'Itinerary fleksibel'],
  price: 'Rp 47.500.000',
  rating: '5.0'
}, {
  id: 'haji',
  title: 'Haji Khusus 1447 H',
  image: '../../assets/img-group.jpg',
  badge: {
    label: 'Kuota Resmi',
    variant: 'success'
  },
  duration: '26 Hari',
  departure: 'Jakarta',
  hotelStars: 5,
  facilities: ['Tenda VIP Arafah–Mina', 'Bimbingan manasik penuh', 'Kuota PIHK resmi'],
  price: 'Rp 198.000.000',
  rating: '4.8'
}];
function HomeScreen({
  onNav,
  onSelectPackage
}) {
  const {
    Button,
    Badge,
    SectionHeading,
    StatBlock,
    PackageCard
  } = window.AqobahDesignSystem_6897ec;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface-deep)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img-hero-makkah.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg, rgba(15,29,43,0.92) 0%, rgba(20,34,66,0.7) 55%, rgba(20,34,66,0.25) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '640px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-300)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '22px',
      height: '2px',
      background: 'var(--gold-300)',
      borderRadius: '2px'
    }
  }), "Penyelenggara Resmi \xB7 Akreditasi A"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-4xl)',
      lineHeight: 1.08,
      color: '#fff',
      margin: 0,
      textWrap: 'balance'
    }
  }, "Ibadah yang Santun & Amanah, ke Tanah Suci"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'rgba(255,255,255,0.86)',
      margin: 0,
      maxWidth: '52ch'
    }
  }, "16 tahun mendampingi lebih dari 10.000 jamaah haji & umrah \u2014 dari rombongan besar hingga tamu VIP dengan permintaan khusus."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      marginTop: '4px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav('packages')
  }, "Lihat Paket Umroh"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('contact'),
    style: {
      background: 'rgba(255,255,255,0.1)',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.3)'
    }
  }, "Konsultasi via WhatsApp"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--brand-primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-6)',
      display: 'flex',
      gap: 'var(--space-8)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "16 Thn",
    label: "Pengalaman beroperasi",
    onDark: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "10.000+",
    label: "Jamaah & wisatawan",
    onDark: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "40",
    label: "Mitra & cabang",
    onDark: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "4.8/5.0",
    label: "Penilaian pelanggan",
    onDark: true
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Paket Pilihan",
    title: "Berangkat dengan tenang, setiap pekan",
    subtitle: "Pilihan paket umrah dan haji khusus dengan hotel dekat Masjidil Haram dan pembimbing bersertifikat.",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-7)'
    }
  }, PACKAGES.map(p => /*#__PURE__*/React.createElement(PackageCard, _extends({
    key: p.id
  }, p, {
    onSelect: () => onSelectPackage(p)
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-accent-soft)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-8)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-7)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Komitmen Kami",
    title: "#SantunAmanah dalam setiap langkah",
    subtitle: "Dari pengurusan visa hingga bimbingan manasik, kami memastikan ibadah Anda bermakna dan penuh kebahagiaan."
  })), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, ['Izin resmi PIHK 610 & PPIU 579', 'Pembimbing ibadah bersertifikat', 'Hotel berjarak dekat dari Haram', 'Pendampingan tamu VIP & big group'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: 'var(--gold-300)',
      color: 'var(--indigo-800)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700
    }
  }, "\u2713"), t))))));
}
Object.assign(window, {
  HomeScreen,
  AQOBAH_PACKAGES: PACKAGES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LayananScreen.jsx
try { (() => {
// Aqobah — Layanan unggulan, Pendanaan & Tabungan, Kemitraan B2B.
const BIZ_UNITS = [['Plane', 'Umrah', 'Umroh reguler & private sepanjang tahun.'], ['Sparkles', 'Haji Khusus', 'Visa resmi, waktu tunggu 5–9 tahun.'], ['Palmtree', 'Wisata Halal', 'Paket wisata muslim-friendly domestik & luar negeri.'], ['Briefcase', 'B2B', 'Provider tiket, visa, & layanan korporat.']];
const FUNDING_PARTNERS = ['Amitra', 'Pegadaian Syariah', 'CIMB Syariah', 'Bank Jakarta'];
const B2B_SERVICES = [['Gift', 'Hadiah Karyawan', 'Apresiasi umrah/wisata sebagai benefit karyawan.'], ['Ticket', 'Hadiah Undian', 'Paket perjalanan sebagai grand prize program Anda.'], ['HeartHandshake', 'CSR', 'Program tanggung jawab sosial berbasis perjalanan ibadah.'], ['PlaneTakeoff', 'Provider Tiket', 'Penyediaan tiket & visa untuk instansi dan agen.']];
const TRUSTED_BY = ['Pegadaian', 'Bank BRI', 'UIMA', '+ lainnya'];
function LY_Ico({
  name,
  size = 22
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide && lucide[name]) {
      ref.current.innerHTML = '';
      ref.current.appendChild(lucide.createElement(lucide[name]));
      const s = ref.current.querySelector('svg');
      if (s) {
        s.setAttribute('width', size);
        s.setAttribute('height', size);
        s.setAttribute('stroke-width', 1.7);
      }
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'flex'
    }
  });
}
function LayananScreen({
  onNav
}) {
  const {
    Button,
    Badge,
    Card,
    SectionHeading
  } = window.AqobahDesignSystem_6897ec;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-deep)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(90% 120% at 85% 10%, rgba(252,176,23,0.14), rgba(0,0,0,0))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    eyebrow: "Layanan & Kemitraan",
    title: "Empat unit bisnis, satu komitmen #SantunAmanah",
    subtitle: "Dari ibadah ke tanah suci hingga kemitraan korporat \u2014 Aqobah melayani individu dan instansi."
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-5)'
    }
  }, BIZ_UNITS.map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    elevation: "sm",
    padding: "lg",
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-soft)',
      color: 'var(--brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement(LY_Ico, {
    name: ic
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      margin: '0 0 6px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-accent-soft)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-8)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-7)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Layanan Unggulan",
    title: "Pendanaan & Tabungan Umrah dan Haji",
    subtitle: "Wujudkan niat ke tanah suci dengan skema pendanaan dan tabungan ringan, bekerja sama dengan mitra keuangan syariah tepercaya."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNav('contact')
  }, "Ajukan Pendanaan"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--gold-600)',
      marginBottom: '14px'
    }
  }, "Mitra Pendanaan & Tabungan"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    }
  }, FUNDING_PARTNERS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--indigo-700)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success-500)'
    }
  }, /*#__PURE__*/React.createElement(LY_Ico, {
    name: "Landmark",
    size: 18
  })), p))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: '12px'
    }
  }, "dan mitra keuangan syariah lainnya")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Kerja Sama B2B",
    title: "Program kemitraan untuk Individu & Instansi",
    subtitle: "Aqobah menjadi mitra perjalanan untuk kebutuhan korporat \u2014 dari apresiasi karyawan hingga program CSR.",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-7)'
    }
  }, B2B_SERVICES.map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-seal)'
    }
  }, /*#__PURE__*/React.createElement(LY_Ico, {
    name: ic,
    size: 26
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      margin: 0
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      padding: 'var(--space-10) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginBottom: '18px'
    }
  }, "Dipercaya oleh instansi & perusahaan terkemuka"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, TRUSTED_BY.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--neutral-400)',
      padding: '10px 22px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)'
    }
  }, t))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: '14px'
    }
  }, "Referensi lengkap perusahaan & tokoh akan ditampilkan menyusul."))));
}
Object.assign(window, {
  LayananScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LayananScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PackageDetail.jsx
try { (() => {
// Aqobah marketing site — Package detail + booking screen.
function PackageDetail({
  pkg,
  onNav,
  onBook
}) {
  const {
    Button,
    Badge,
    Card,
    Input,
    SectionHeading
  } = window.AqobahDesignSystem_6897ec;
  const p = pkg || window.AQOBAH_PACKAGES[0];
  const [submitted, setSubmitted] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav('home'),
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      display: 'inline-flex',
      gap: '6px',
      marginBottom: 'var(--space-5)'
    }
  }, "\u2190 Kembali ke Beranda"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 'var(--space-7)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      height: '360px',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: p.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '16px',
      left: '16px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: p.badge?.variant || 'seal',
    soft: false
  }, p.badge?.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: `${p.duration} · ${p.departure}`,
    title: p.title,
    subtitle: "Program ibadah lengkap dengan bimbingan penuh, akomodasi terbaik, dan pelayanan Santun & Amanah khas Aqobah."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-6)'
    }
  }, [['Durasi', p.duration], ['Keberangkatan', p.departure], ['Hotel', `${p.hotelStars} Bintang`]].map(([k, v]) => /*#__PURE__*/React.createElement(Card, {
    key: k,
    elevation: "sm",
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      marginTop: '4px'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      margin: '0 0 14px'
    }
  }, "Fasilitas Termasuk"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    }
  }, [...p.facilities, 'Air Zamzam 5 liter', 'Perlengkapan ibadah', 'Asuransi perjalanan', 'Manasik sebelum berangkat'].map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success-500)',
      flex: 'none'
    }
  }, "\u2713"), f))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: '94px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    elevation: "lg",
    padding: "lg",
    goldTop: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "Mulai dari"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 700,
      color: 'var(--brand-seal)',
      lineHeight: 1.1
    }
  }, p.price), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: '2px',
      marginBottom: 'var(--space-5)'
    }
  }, "per jamaah \xB7 \u2605 ", p.rating, " dari jamaah"), submitted ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--success-50)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-5)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 700,
      color: 'var(--success-500)'
    }
  }, "Terima kasih!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      margin: '6px 0 0'
    }
  }, "Tim kami akan menghubungi Anda via WhatsApp dalam 1\xD724 jam.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nama Lengkap",
    placeholder: "Sesuai paspor"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "No. WhatsApp",
    placeholder: "+62...",
    hint: "Aktif untuk konfirmasi"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    onClick: () => setSubmitted(true)
  }, "Daftar Sekarang"), /*#__PURE__*/React.createElement(Button, {
    variant: "seal",
    fullWidth: true,
    onClick: () => setSubmitted(true)
  }, "Tanya via WhatsApp"))))));
}
Object.assign(window, {
  PackageDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PackageDetail.jsx", error: String((e && e.message) || e) }); }

__ds_ns.FacilityItem = __ds_scope.FacilityItem;

__ds_ns.PackageCard = __ds_scope.PackageCard;

__ds_ns.PricingTier = __ds_scope.PricingTier;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

})();
