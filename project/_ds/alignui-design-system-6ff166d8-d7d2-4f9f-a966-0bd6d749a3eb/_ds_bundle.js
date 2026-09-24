/* @ds-bundle: {"format":4,"namespace":"AlignUIDesignSystem_6ff166","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"FancyButton","sourcePath":"components/buttons/FancyButton.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"LinkButton","sourcePath":"components/buttons/LinkButton.jsx"},{"name":"Accordion","sourcePath":"components/data-display/Accordion.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/data-display/AvatarGroup.jsx"},{"name":"Breadcrumbs","sourcePath":"components/data-display/Breadcrumbs.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Divider","sourcePath":"components/data-display/Divider.jsx"},{"name":"Modal","sourcePath":"components/data-display/Modal.jsx"},{"name":"Pagination","sourcePath":"components/data-display/Pagination.jsx"},{"name":"Rating","sourcePath":"components/data-display/Rating.jsx"},{"name":"Tabs","sourcePath":"components/data-display/Tabs.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"StatusBadge","sourcePath":"components/feedback/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Hint","sourcePath":"components/forms/Hint.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Label","sourcePath":"components/forms/Label.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"da80629f1d4b","components/buttons/FancyButton.jsx":"3b0b75e6cf01","components/buttons/IconButton.jsx":"1d2434a27fb1","components/buttons/LinkButton.jsx":"d7af926c8f0e","components/data-display/Accordion.jsx":"1f9cda401edf","components/data-display/Avatar.jsx":"320f83178998","components/data-display/AvatarGroup.jsx":"545155f3b49d","components/data-display/Breadcrumbs.jsx":"df707f8d9e32","components/data-display/Card.jsx":"7b7c20ebb073","components/data-display/Divider.jsx":"a7cfa086ded3","components/data-display/Modal.jsx":"7aee0a217a87","components/data-display/Pagination.jsx":"e6995d990801","components/data-display/Rating.jsx":"747a7818773e","components/data-display/Tabs.jsx":"04dfbbdb5ddd","components/feedback/Alert.jsx":"b3fa0896cd1a","components/feedback/Badge.jsx":"2549df342366","components/feedback/Banner.jsx":"13f780a3bca3","components/feedback/ProgressBar.jsx":"733b8a01c119","components/feedback/StatusBadge.jsx":"e19861d35e39","components/feedback/Tag.jsx":"fed94fd3cd1e","components/feedback/Tooltip.jsx":"4fb5dcaa0941","components/forms/Checkbox.jsx":"7228d1d7a03a","components/forms/Hint.jsx":"557ccf82c8c5","components/forms/Input.jsx":"529153ebf813","components/forms/Label.jsx":"2629e3255ae0","components/forms/Radio.jsx":"5949172aad8d","components/forms/Select.jsx":"95b8acf633e4","components/forms/Switch.jsx":"fed1368e6911","components/forms/Textarea.jsx":"8bb99280a892","ui_kits/medical-portal/App.jsx":"3413d90e9e8e","ui_kits/medical-portal/DashboardView.jsx":"d51967d11c1c","ui_kits/medical-portal/LoginView.jsx":"2fd2f6b36450","ui_kits/medical-portal/PatientDetailView.jsx":"863de962c4f1","ui_kits/medical-portal/PatientsView.jsx":"3c2dc7ea5266","ui_kits/medical-portal/Sidebar.jsx":"480011c26fb2","ui_kits/medical-portal/Topbar.jsx":"6ac88dedb7b9","ui_kits/medical-portal/data.js":"ffefffeff5c1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlignUIDesignSystem_6ff166 = window.AlignUIDesignSystem_6ff166 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xsmall: {
    height: 32,
    radius: 'var(--r-8)',
    padX: 10,
    gap: 4,
    font: 'var(--font-sans)',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: '-0.006em',
    icon: 18
  },
  small: {
    height: 36,
    radius: 'var(--r-8)',
    padX: 12,
    gap: 4,
    font: 'var(--font-sans)',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: '-0.006em',
    icon: 20
  },
  medium: {
    height: 40,
    radius: 'var(--r-10)',
    padX: 12,
    gap: 6,
    font: 'var(--font-sans)',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: '-0.006em',
    icon: 20
  },
  large: {
    height: 48,
    radius: 'var(--r-12)',
    padX: 14,
    gap: 6,
    font: 'var(--font-sans)',
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 500,
    letterSpacing: '-0.011em',
    icon: 20
  }
};

// [variant][mode] => { bg, color, border, hoverBg, hoverColor, hoverBorder }
const PALETTE = {
  primary: {
    filled: {
      bg: 'var(--primary-base)',
      color: 'var(--text-white-0)',
      hoverBg: 'var(--primary-dark)'
    },
    stroke: {
      bg: 'var(--bg-white-0)',
      color: 'var(--primary-base)',
      border: 'var(--primary-base)',
      hoverBg: 'var(--primary-lighter)'
    },
    lighter: {
      bg: 'var(--primary-lighter)',
      color: 'var(--primary-base)',
      hoverBg: 'var(--primary-light)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--primary-base)',
      hoverBg: 'var(--primary-lighter)'
    }
  },
  neutral: {
    filled: {
      bg: 'var(--bg-strong-900)',
      color: 'var(--text-white-0)',
      hoverBg: 'var(--neutral-700)'
    },
    stroke: {
      bg: 'var(--bg-white-0)',
      color: 'var(--text-sub-500)',
      border: 'var(--stroke-soft-200)',
      hoverBg: 'var(--bg-weak-100)',
      hoverColor: 'var(--text-main-900)'
    },
    lighter: {
      bg: 'var(--bg-weak-100)',
      color: 'var(--text-sub-500)',
      hoverBg: 'var(--neutral-200)',
      hoverColor: 'var(--text-main-900)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--text-sub-500)',
      hoverBg: 'var(--bg-weak-100)',
      hoverColor: 'var(--text-main-900)'
    }
  },
  error: {
    filled: {
      bg: 'var(--red-base)',
      color: 'var(--text-white-0)',
      hoverBg: 'var(--red-dark)'
    },
    stroke: {
      bg: 'var(--bg-white-0)',
      color: 'var(--red-base)',
      border: 'var(--red-base)',
      hoverBg: 'var(--red-lighter)'
    },
    lighter: {
      bg: 'var(--red-lighter)',
      color: 'var(--red-base)',
      hoverBg: 'var(--red-light)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--red-base)',
      hoverBg: 'var(--red-lighter)'
    }
  }
};
function Button({
  children,
  variant = 'primary',
  mode = 'filled',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const pal = (PALETTE[variant] || PALETTE.primary)[mode] || PALETTE.primary.filled;
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: sz.gap,
    height: sz.height,
    padding: `0 ${sz.padX}px`,
    borderRadius: sz.radius,
    fontFamily: sz.font,
    fontSize: sz.fontSize,
    lineHeight: sz.lineHeight,
    fontWeight: sz.fontWeight,
    letterSpacing: sz.letterSpacing,
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: pal.border ? `1px solid ${active && pal.hoverBorder ? pal.hoverBorder : pal.border}` : '1px solid transparent',
    background: active && pal.hoverBg ? pal.hoverBg : pal.bg,
    color: active && pal.hoverColor ? pal.hoverColor : pal.color,
    transition: 'background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease',
    boxSizing: 'border-box',
    opacity: disabled ? 0.48 : 1,
    outline: 'none',
    ...style
  };
  const iconStyle = {
    fontSize: sz.icon,
    lineHeight: 1,
    display: 'inline-flex',
    flex: '0 0 auto'
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    className: className,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: iconStyle
  }), children != null && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 2px'
    }
  }, children), trailingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${trailingIcon}`,
    style: iconStyle
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/FancyButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xsmall: {
    height: 32,
    radius: 'var(--r-8)',
    padX: 12,
    fontSize: 14,
    icon: 18
  },
  small: {
    height: 36,
    radius: 'var(--r-8)',
    padX: 14,
    fontSize: 14,
    icon: 20
  },
  medium: {
    height: 40,
    radius: 'var(--r-10)',
    padX: 16,
    fontSize: 14,
    icon: 20
  },
  large: {
    height: 48,
    radius: 'var(--r-12)',
    padX: 20,
    fontSize: 16,
    icon: 20
  }
};

// Fancy buttons add an inset top-highlight + soft drop shadow for a raised, glossy CTA.
const COLORS = {
  primary: {
    bg: 'var(--primary-base)',
    color: '#fff',
    hoverBg: 'var(--primary-dark)',
    ring: 'rgba(77,66,233,0.40)'
  },
  neutral: {
    bg: 'var(--bg-strong-900)',
    color: '#fff',
    hoverBg: 'var(--neutral-700)',
    ring: 'rgba(14,18,27,0.40)'
  },
  error: {
    bg: 'var(--red-base)',
    color: '#fff',
    hoverBg: 'var(--red-dark)',
    ring: 'rgba(223,28,65,0.40)'
  }
};
function FancyButton({
  children,
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const c = COLORS[variant] || COLORS.primary;
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: sz.height,
      padding: `0 ${sz.padX}px`,
      borderRadius: sz.radius,
      border: 'none',
      background: active ? c.hoverBg : c.bg,
      color: c.color,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: sz.fontSize,
      letterSpacing: '-0.006em',
      whiteSpace: 'nowrap',
      boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.16), inset 0 -2px 4px 0 rgba(14,18,27,0.20), 0 1px 2px 0 ${c.ring}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.48 : 1,
      transition: 'background .15s ease',
      boxSizing: 'border-box',
      outline: 'none',
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: {
      fontSize: sz.icon,
      lineHeight: 1
    }
  }), children, trailingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${trailingIcon}`,
    style: {
      fontSize: sz.icon,
      lineHeight: 1
    }
  }));
}
Object.assign(__ds_scope, { FancyButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/FancyButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  xsmall: {
    box: 32,
    radius: 'var(--r-8)',
    icon: 18
  },
  small: {
    box: 36,
    radius: 'var(--r-8)',
    icon: 20
  },
  medium: {
    box: 40,
    radius: 'var(--r-10)',
    icon: 20
  },
  large: {
    box: 48,
    radius: 'var(--r-12)',
    icon: 24
  }
};
const PALETTE = {
  primary: {
    filled: {
      bg: 'var(--primary-base)',
      color: 'var(--text-white-0)',
      hoverBg: 'var(--primary-dark)'
    },
    stroke: {
      bg: 'var(--bg-white-0)',
      color: 'var(--primary-base)',
      border: 'var(--primary-base)',
      hoverBg: 'var(--primary-lighter)'
    },
    lighter: {
      bg: 'var(--primary-lighter)',
      color: 'var(--primary-base)',
      hoverBg: 'var(--primary-light)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--primary-base)',
      hoverBg: 'var(--primary-lighter)'
    }
  },
  neutral: {
    filled: {
      bg: 'var(--bg-strong-900)',
      color: 'var(--text-white-0)',
      hoverBg: 'var(--neutral-700)'
    },
    stroke: {
      bg: 'var(--bg-white-0)',
      color: 'var(--icon-sub-500)',
      border: 'var(--stroke-soft-200)',
      hoverBg: 'var(--bg-weak-100)',
      hoverColor: 'var(--icon-strong-900)'
    },
    lighter: {
      bg: 'var(--bg-weak-100)',
      color: 'var(--icon-sub-500)',
      hoverBg: 'var(--neutral-200)',
      hoverColor: 'var(--icon-strong-900)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--icon-soft-400)',
      hoverBg: 'var(--bg-weak-100)',
      hoverColor: 'var(--icon-strong-900)'
    }
  },
  error: {
    filled: {
      bg: 'var(--red-base)',
      color: 'var(--text-white-0)',
      hoverBg: 'var(--red-dark)'
    },
    stroke: {
      bg: 'var(--bg-white-0)',
      color: 'var(--red-base)',
      border: 'var(--red-base)',
      hoverBg: 'var(--red-lighter)'
    },
    lighter: {
      bg: 'var(--red-lighter)',
      color: 'var(--red-base)',
      hoverBg: 'var(--red-light)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--red-base)',
      hoverBg: 'var(--red-lighter)'
    }
  }
};
function IconButton({
  icon,
  variant = 'neutral',
  mode = 'stroke',
  size = 'medium',
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const pal = (PALETTE[variant] || PALETTE.neutral)[mode] || PALETTE.neutral.stroke;
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sz.box,
      height: sz.box,
      borderRadius: sz.radius,
      border: pal.border ? `1px solid ${pal.border}` : '1px solid transparent',
      background: active && pal.hoverBg ? pal.hoverBg : pal.bg,
      color: active && pal.hoverColor ? pal.hoverColor : pal.color,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.48 : 1,
      transition: 'background .15s ease, color .15s ease, border-color .15s ease',
      boxSizing: 'border-box',
      outline: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: `ri-${icon}`,
    style: {
      fontSize: sz.icon,
      lineHeight: 1
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/LinkButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  small: {
    fontSize: 14,
    lineHeight: '20px',
    icon: 18,
    gap: 2
  },
  medium: {
    fontSize: 14,
    lineHeight: '20px',
    icon: 20,
    gap: 4
  },
  large: {
    fontSize: 16,
    lineHeight: '24px',
    icon: 20,
    gap: 4
  }
};
const COLORS = {
  primary: {
    color: 'var(--primary-base)',
    hover: 'var(--primary-dark)'
  },
  neutral: {
    color: 'var(--text-sub-500)',
    hover: 'var(--text-main-900)'
  },
  error: {
    color: 'var(--red-base)',
    hover: 'var(--red-dark)'
  },
  white: {
    color: 'var(--text-white-0)',
    hover: 'var(--neutral-200)'
  }
};
function LinkButton({
  children,
  variant = 'primary',
  size = 'medium',
  underline = false,
  leadingIcon,
  trailingIcon,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const c = COLORS[variant] || COLORS.primary;
  const [hover, setHover] = React.useState(false);
  const active = hover && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sz.gap,
      background: 'none',
      border: 'none',
      padding: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: sz.fontSize,
      lineHeight: sz.lineHeight,
      letterSpacing: '-0.006em',
      color: active ? c.hover : c.color,
      textDecoration: underline ? 'underline' : 'none',
      textUnderlineOffset: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.48 : 1,
      transition: 'color .15s ease',
      outline: 'none',
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: {
      fontSize: sz.icon,
      lineHeight: 1
    }
  }), children, trailingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${trailingIcon}`,
    style: {
      fontSize: sz.icon,
      lineHeight: 1
    }
  }));
}
Object.assign(__ds_scope, { LinkButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/LinkButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Accordion.jsx
try { (() => {
/** Single collapsible accordion item. Use `defaultOpen` or control via `open`/`onToggle`. */
function Accordion({
  title,
  children,
  icon,
  open,
  defaultOpen = false,
  onToggle,
  className = '',
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : internal;
  const toggle = () => {
    if (open === undefined) setInternal(v => !v);
    onToggle && onToggle(!isOpen);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      border: '1px solid var(--stroke-soft-200)',
      borderRadius: 'var(--r-12)',
      background: 'var(--bg-white-0)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: 16,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${icon}`,
    style: {
      fontSize: 20,
      color: 'var(--icon-sub-500)',
      lineHeight: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-label-md",
    style: {
      flex: 1,
      color: 'var(--text-main-900)'
    }
  }, title), /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-down-s-line",
    style: {
      fontSize: 20,
      color: 'var(--icon-soft-400)',
      transform: isOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform .2s ease'
    }
  })), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      padding: '0 16px 16px',
      color: 'var(--text-sub-500)'
    }
  }, children));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
const SIZES = {
  20: 8,
  24: 9,
  32: 12,
  40: 14,
  48: 16,
  56: 18,
  64: 20,
  80: 24
};
const DOT = {
  20: 6,
  24: 7,
  32: 8,
  40: 10,
  48: 12,
  56: 14,
  64: 16,
  80: 18
};
const PLACEHOLDER_BG = {
  gray: 'var(--neutral-200)',
  blue: 'var(--blue-light)',
  purple: 'var(--purple-light)',
  orange: 'var(--orange-light)',
  green: 'var(--green-light)',
  yellow: 'var(--yellow-light)'
};
const PLACEHOLDER_FG = {
  gray: 'var(--neutral-500)',
  blue: 'var(--blue-base)',
  purple: 'var(--purple-base)',
  orange: 'var(--orange-dark)',
  green: 'var(--green-dark)',
  yellow: 'var(--yellow-dark)'
};
const STATUS = {
  online: 'var(--green-base)',
  away: 'var(--yellow-base)',
  busy: 'var(--red-base)',
  offline: 'var(--neutral-400)'
};

/** Circular avatar. Pass `src` (image), or `initials`/`color` for a placeholder. */
function Avatar({
  src,
  alt = '',
  initials,
  color = 'gray',
  size = 40,
  status,
  className = '',
  style = {}
}) {
  const font = SIZES[size] || 14;
  const dot = DOT[size] || 10;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: size,
      height: size,
      flex: '0 0 auto',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: PLACEHOLDER_BG[color] || PLACEHOLDER_BG.gray,
      color: PLACEHOLDER_FG[color] || PLACEHOLDER_FG.gray,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: font,
      letterSpacing: '-0.01em'
    }
  }, initials || /*#__PURE__*/React.createElement("i", {
    className: "ri-user-3-fill",
    style: {
      fontSize: font * 1.3
    }
  })), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: dot,
      height: dot,
      borderRadius: '50%',
      background: STATUS[status] || STATUS.online,
      border: '2px solid var(--bg-white-0)',
      boxSizing: 'content-box',
      transform: 'translate(15%, 15%)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/AvatarGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Overlapping stack of avatars with an optional +N overflow chip. */
function AvatarGroup({
  items = [],
  size = 32,
  max = 4,
  className = '',
  style = {}
}) {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  const overlap = Math.round(size * 0.3);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      ...style
    }
  }, shown.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -overlap,
      borderRadius: '50%',
      boxShadow: '0 0 0 2px var(--bg-white-0)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, _extends({
    size: size
  }, it)))), extra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -overlap,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--bg-weak-100)',
      color: 'var(--text-sub-500)',
      boxShadow: '0 0 0 2px var(--bg-white-0)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: Math.max(10, size * 0.34)
    }
  }, "+", extra));
}
Object.assign(__ds_scope, { AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/AvatarGroup.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Breadcrumbs.jsx
try { (() => {
/** Breadcrumb trail. items: [{label, href, icon}]. Last item is the current page. */
function Breadcrumbs({
  items = [],
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: className,
    "aria-label": "Breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("a", {
      href: it.href || '#',
      className: "text-label-sm",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        textDecoration: 'none',
        color: last ? 'var(--text-main-900)' : 'var(--text-soft-400)',
        pointerEvents: last ? 'none' : 'auto'
      }
    }, it.icon && /*#__PURE__*/React.createElement("i", {
      className: `ri-${it.icon}`,
      style: {
        fontSize: 16,
        lineHeight: 1
      }
    }), it.label), !last && /*#__PURE__*/React.createElement("i", {
      className: "ri-arrow-right-s-line",
      style: {
        fontSize: 18,
        color: 'var(--icon-disabled-300)',
        lineHeight: 1
      }
    }));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
/** Surface container. Subtle hairline ring + radius; optional padding & hover lift. */
function Card({
  children,
  padding = 20,
  hover = false,
  className = '',
  style = {}
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onMouseEnter: () => hover && setH(true),
    onMouseLeave: () => hover && setH(false),
    style: {
      background: 'var(--bg-white-0)',
      borderRadius: 'var(--r-16)',
      border: '1px solid var(--stroke-soft-200)',
      boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      padding,
      boxSizing: 'border-box',
      transition: 'box-shadow .2s ease, transform .2s ease',
      transform: h ? 'translateY(-2px)' : 'none',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Divider.jsx
try { (() => {
/** Horizontal or vertical divider, optionally with centered text/label. */
function Divider({
  children,
  orientation = 'horizontal',
  className = '',
  style = {}
}) {
  if (orientation === 'vertical') {
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: {
        width: 1,
        alignSelf: 'stretch',
        background: 'var(--stroke-soft-200)',
        ...style
      }
    });
  }
  if (children) {
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: 'var(--stroke-soft-200)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-subheading-xs",
      style: {
        color: 'var(--text-soft-400)'
      }
    }, children), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: 'var(--stroke-soft-200)'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      height: 1,
      background: 'var(--stroke-soft-200)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Divider.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Modal.jsx
try { (() => {
/** Centered modal dialog with overlay. Controlled via `open`/`onClose`. */
function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  iconColor = 'primary',
  children,
  footer,
  width = 440,
  className = '',
  style = {}
}) {
  if (!open) return null;
  const ic = {
    primary: ['var(--primary-base)', 'var(--primary-lighter)'],
    success: ['var(--green-base)', 'var(--green-lighter)'],
    warning: ['var(--orange-base)', 'var(--orange-lighter)'],
    error: ['var(--red-base)', 'var(--red-lighter)']
  }[iconColor] || ['var(--primary-base)', 'var(--primary-lighter)'];
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(14,18,27,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--bg-white-0)',
      borderRadius: 'var(--r-20)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: '0 0 auto',
      borderRadius: 'var(--r-full)',
      background: ic[1],
      color: ic[0],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `ri-${icon}`,
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "text-label-md",
    style: {
      color: 'var(--text-main-900)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-sub-500)',
      marginTop: 2
    }
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      color: 'var(--icon-soft-400)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line",
    style: {
      fontSize: 22
    }
  }))), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px 8px'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: 20,
      borderTop: '1px solid var(--stroke-soft-200)',
      marginTop: 8
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Modal.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Pagination.jsx
try { (() => {
/** Pagination control. Controlled via page/onChange. */
function Pagination({
  page = 1,
  total = 1,
  onChange,
  siblings = 1,
  className = '',
  style = {}
}) {
  const go = p => {
    if (p < 1 || p > total || p === page) return;
    onChange && onChange(p);
  };
  const range = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  range.push(1);
  if (left > 2) range.push('…');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('…');
  if (total > 1) range.push(total);
  const cell = (content, opts = {}) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: opts.onClick,
    disabled: opts.disabled,
    className: "text-label-sm",
    style: {
      minWidth: 36,
      height: 36,
      padding: '0 8px',
      borderRadius: 'var(--r-8)',
      border: opts.active ? '1px solid var(--stroke-soft-200)' : '1px solid transparent',
      background: opts.active ? 'var(--bg-white-0)' : 'transparent',
      boxShadow: opts.active ? 'var(--shadow-xs)' : 'none',
      color: opts.disabled ? 'var(--text-disabled-300)' : opts.active ? 'var(--text-main-900)' : 'var(--text-soft-400)',
      cursor: opts.disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      ...style
    }
  }, cell(/*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-s-line",
    style: {
      fontSize: 20
    }
  }), {
    onClick: () => go(page - 1),
    disabled: page === 1
  }), range.map((r, i) => r === '…' ? /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      minWidth: 24,
      textAlign: 'center',
      color: 'var(--text-disabled-300)'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, cell(r, {
    onClick: () => go(r),
    active: r === page
  }))), cell(/*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-right-s-line",
    style: {
      fontSize: 20
    }
  }), {
    onClick: () => go(page + 1),
    disabled: page === total
  }));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Rating.jsx
try { (() => {
/** Star rating. Read-only by default; pass onChange to make interactive. */
function Rating({
  value = 0,
  max = 5,
  size = 20,
  onChange,
  className = '',
  style = {}
}) {
  const [hover, setHover] = React.useState(0);
  const interactive = typeof onChange === 'function';
  const shown = hover || value;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      ...style
    },
    onMouseLeave: () => setHover(0)
  }, Array.from({
    length: max
  }).map((_, i) => {
    const n = i + 1;
    const filled = n <= shown;
    return /*#__PURE__*/React.createElement("i", {
      key: i,
      className: filled ? 'ri-star-fill' : 'ri-star-line',
      onMouseEnter: () => interactive && setHover(n),
      onClick: () => interactive && onChange(n),
      style: {
        fontSize: size,
        lineHeight: 1,
        color: filled ? 'var(--yellow-base)' : 'var(--neutral-300)',
        cursor: interactive ? 'pointer' : 'default'
      }
    });
  }));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Rating.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tabs.jsx
try { (() => {
/** Tab bar. items: [{value,label,icon,badge}]. Controlled via value/onChange or uncontrolled. */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  className = '',
  style = {}
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  const isPill = variant === 'pill';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: isPill ? 4 : 0,
      borderBottom: isPill ? 'none' : '1px solid var(--stroke-soft-200)',
      background: isPill ? 'var(--bg-weak-100)' : 'transparent',
      padding: isPill ? 4 : 0,
      borderRadius: isPill ? 'var(--r-10)' : 0,
      ...style
    }
  }, items.map(it => {
    const on = it.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      type: "button",
      role: "tab",
      "aria-selected": on,
      onClick: () => select(it.value),
      className: "text-label-sm",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: isPill ? '6px 12px' : '10px 12px',
        border: 'none',
        background: isPill && on ? 'var(--bg-white-0)' : 'transparent',
        borderRadius: isPill ? 'var(--r-8)' : 0,
        boxShadow: isPill && on ? 'var(--shadow-xs)' : 'none',
        borderBottom: isPill ? 'none' : `2px solid ${on ? 'var(--primary-base)' : 'transparent'}`,
        marginBottom: isPill ? 0 : -1,
        color: on ? 'var(--text-main-900)' : 'var(--text-soft-400)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'color .15s ease'
      }
    }, it.icon && /*#__PURE__*/React.createElement("i", {
      className: `ri-${it.icon}`,
      style: {
        fontSize: 18,
        lineHeight: 1
      }
    }), it.label, it.badge != null && /*#__PURE__*/React.createElement("span", {
      className: "text-subheading-2xs",
      style: {
        background: on ? 'var(--primary-lighter)' : 'var(--bg-soft-200)',
        color: on ? 'var(--primary-base)' : 'var(--text-soft-400)',
        borderRadius: 'var(--r-full)',
        padding: '1px 6px',
        minWidth: 18,
        textAlign: 'center'
      }
    }, it.badge));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const STATES = {
  info: {
    color: 'var(--blue-base)',
    icon: 'information-fill'
  },
  success: {
    color: 'var(--green-base)',
    icon: 'checkbox-circle-fill'
  },
  warning: {
    color: 'var(--orange-base)',
    icon: 'alert-fill'
  },
  error: {
    color: 'var(--red-base)',
    icon: 'error-warning-fill'
  },
  feature: {
    color: 'var(--purple-base)',
    icon: 'magic-fill'
  }
};
const LIGHT = {
  info: 'var(--blue-lighter)',
  success: 'var(--green-lighter)',
  warning: 'var(--orange-lighter)',
  error: 'var(--red-lighter)',
  feature: 'var(--purple-lighter)'
};

/** Inline alert. variant: filled | light | stroke. */
function Alert({
  state = 'info',
  variant = 'light',
  title,
  children,
  icon,
  onClose,
  action,
  className = '',
  style = {}
}) {
  const s = STATES[state] || STATES.info;
  const filled = variant === 'filled';
  const stroke = variant === 'stroke';
  const bg = filled ? s.color : stroke ? 'var(--bg-white-0)' : LIGHT[state];
  const fg = filled ? '#fff' : 'var(--text-main-900)';
  const iconColor = filled ? '#fff' : s.color;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      gap: 10,
      padding: 12,
      borderRadius: 'var(--r-12)',
      background: bg,
      color: fg,
      border: stroke ? `1px solid var(--stroke-soft-200)` : '1px solid transparent',
      boxShadow: stroke ? 'var(--shadow-xs)' : 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `ri-${icon || s.icon}`,
    style: {
      fontSize: 20,
      lineHeight: 1,
      color: iconColor,
      flex: '0 0 auto',
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      color: fg
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      color: filled ? 'rgba(255,255,255,0.9)' : 'var(--text-sub-500)'
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, action)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      color: filled ? 'rgba(255,255,255,0.8)' : 'var(--icon-soft-400)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line",
    style: {
      fontSize: 20,
      lineHeight: 1
    }
  })));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
// color => { base, light, lighter }
const C = {
  gray: {
    base: 'var(--neutral-500)',
    light: 'var(--neutral-200)',
    lighter: 'var(--neutral-100)'
  },
  blue: {
    base: 'var(--blue-base)',
    light: 'var(--blue-light)',
    lighter: 'var(--blue-lighter)'
  },
  orange: {
    base: 'var(--orange-base)',
    light: 'var(--orange-light)',
    lighter: 'var(--orange-lighter)'
  },
  red: {
    base: 'var(--red-base)',
    light: 'var(--red-light)',
    lighter: 'var(--red-lighter)'
  },
  green: {
    base: 'var(--green-base)',
    light: 'var(--green-light)',
    lighter: 'var(--green-lighter)'
  },
  yellow: {
    base: 'var(--yellow-base)',
    light: 'var(--yellow-light)',
    lighter: 'var(--yellow-lighter)'
  },
  purple: {
    base: 'var(--purple-base)',
    light: 'var(--purple-light)',
    lighter: 'var(--purple-lighter)'
  },
  teal: {
    base: 'var(--teal-base)',
    light: 'var(--teal-light)',
    lighter: 'var(--teal-lighter)'
  },
  pink: {
    base: 'var(--pink-base)',
    light: 'var(--pink-light)',
    lighter: 'var(--pink-lighter)'
  }
};
const SIZES = {
  small: {
    h: 16,
    font: 11,
    padX: 6,
    icon: 12
  },
  medium: {
    h: 20,
    font: 12,
    padX: 8,
    icon: 14
  }
};
function Badge({
  children,
  color = 'gray',
  variant = 'light',
  size = 'medium',
  leadingIcon,
  dot = false,
  className = '',
  style = {}
}) {
  const c = C[color] || C.gray;
  const sz = SIZES[size] || SIZES.medium;
  let bg,
    fg,
    border = 'transparent';
  if (variant === 'filled') {
    bg = c.base;
    fg = '#fff';
  } else if (variant === 'light') {
    bg = c.light;
    fg = c.base;
  } else if (variant === 'lighter') {
    bg = c.lighter;
    fg = c.base;
  } else if (variant === 'stroke') {
    bg = 'transparent';
    fg = c.base;
    border = c.base;
  }
  return /*#__PURE__*/React.createElement("span", {
    className: `text-subheading-2xs ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: sz.h,
      padding: `0 ${sz.padX}px`,
      borderRadius: 'var(--r-full)',
      background: bg,
      color: fg,
      border: `1px solid ${border}`,
      fontSize: sz.font,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: {
      fontSize: sz.icon,
      lineHeight: 1
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
const STATES = {
  info: {
    color: 'var(--blue-base)',
    light: 'var(--blue-lighter)',
    icon: 'information-fill'
  },
  success: {
    color: 'var(--green-base)',
    light: 'var(--green-lighter)',
    icon: 'checkbox-circle-fill'
  },
  warning: {
    color: 'var(--orange-base)',
    light: 'var(--orange-lighter)',
    icon: 'alert-fill'
  },
  error: {
    color: 'var(--red-base)',
    light: 'var(--red-lighter)',
    icon: 'error-warning-fill'
  },
  feature: {
    color: 'var(--purple-base)',
    light: 'var(--purple-lighter)',
    icon: 'magic-fill'
  }
};

/** Full-width announcement / page banner. variant: filled | light | stroke. */
function Banner({
  state = 'feature',
  variant = 'light',
  children,
  icon,
  action,
  onClose,
  className = '',
  style = {}
}) {
  const s = STATES[state] || STATES.feature;
  const filled = variant === 'filled';
  const bg = filled ? s.color : variant === 'stroke' ? 'var(--bg-white-0)' : s.light;
  const fg = filled ? '#fff' : 'var(--text-main-900)';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      background: bg,
      color: fg,
      borderBottom: variant === 'stroke' ? '1px solid var(--stroke-soft-200)' : 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `ri-${icon || s.icon}`,
    style: {
      fontSize: 20,
      lineHeight: 1,
      color: filled ? '#fff' : s.color,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      flex: 1,
      minWidth: 0
    }
  }, children), action, onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      color: filled ? 'rgba(255,255,255,0.85)' : 'var(--icon-soft-400)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line",
    style: {
      fontSize: 20,
      lineHeight: 1
    }
  })));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
const COLORS = {
  primary: 'var(--primary-base)',
  green: 'var(--green-base)',
  orange: 'var(--orange-base)',
  red: 'var(--red-base)',
  blue: 'var(--blue-base)',
  neutral: 'var(--neutral-900)'
};

/** Linear progress bar. value 0–100. */
function ProgressBar({
  value = 0,
  color = 'primary',
  size = 'medium',
  showLabel = false,
  className = '',
  style = {}
}) {
  const h = size === 'small' ? 4 : size === 'large' ? 10 : 6;
  const fill = COLORS[color] || COLORS.primary;
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: h,
      borderRadius: 'var(--r-full)',
      background: 'var(--bg-soft-200)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--r-full)',
      background: fill,
      transition: 'width .3s ease'
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    className: "text-label-sm",
    style: {
      color: 'var(--text-sub-500)',
      minWidth: 36,
      textAlign: 'right'
    }
  }, Math.round(pct), "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusBadge.jsx
try { (() => {
const STATUS = {
  online: {
    color: 'var(--green-base)',
    label: 'Online'
  },
  away: {
    color: 'var(--yellow-base)',
    label: 'Away'
  },
  busy: {
    color: 'var(--red-base)',
    label: 'Busy'
  },
  offline: {
    color: 'var(--neutral-400)',
    label: 'Offline'
  },
  pending: {
    color: 'var(--orange-base)',
    label: 'Pending'
  },
  completed: {
    color: 'var(--green-base)',
    label: 'Completed'
  },
  cancelled: {
    color: 'var(--red-base)',
    label: 'Cancelled'
  },
  in_progress: {
    color: 'var(--blue-base)',
    label: 'In progress'
  }
};

/** Dot + label status indicator. Pass a known `status` or custom `color`/`children`. */
function StatusBadge({
  status = 'online',
  children,
  color,
  variant = 'stroke',
  className = '',
  style = {}
}) {
  const s = STATUS[status] || STATUS.online;
  const dot = color || s.color;
  const label = children || s.label;
  const isLight = variant === 'light';
  return /*#__PURE__*/React.createElement("span", {
    className: `text-label-sm ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 8px',
      borderRadius: 'var(--r-6)',
      background: isLight ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      border: isLight ? '1px solid transparent' : '1px solid var(--stroke-soft-200)',
      color: 'var(--text-sub-500)',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: dot,
      flex: '0 0 auto'
    }
  }), label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
/** Rectangular tag/chip with optional leading icon and dismiss button. */
function Tag({
  children,
  variant = 'stroke',
  leadingIcon,
  onDismiss,
  disabled = false,
  className = '',
  style = {}
}) {
  const filled = variant === 'gray';
  return /*#__PURE__*/React.createElement("span", {
    className: `text-label-sm ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 8px',
      borderRadius: 'var(--r-6)',
      background: filled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      color: 'var(--text-sub-500)',
      border: filled ? '1px solid transparent' : '1px solid var(--stroke-soft-200)',
      opacity: disabled ? 0.5 : 1,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: {
      fontSize: 16,
      color: 'var(--icon-soft-400)',
      lineHeight: 1
    }
  }), children, onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      border: 'none',
      background: 'none',
      padding: 0,
      marginLeft: 2,
      color: 'var(--icon-soft-400)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line",
    style: {
      fontSize: 16,
      lineHeight: 1
    }
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Hover/focus tooltip. Wraps its children; shows `content` on a dark bubble. */
function Tooltip({
  content,
  side = 'top',
  children,
  className = '',
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: "text-label-xs",
    style: {
      position: 'absolute',
      zIndex: 50,
      ...pos,
      background: 'var(--bg-strong-900)',
      color: 'var(--text-white-0)',
      padding: '4px 8px',
      borderRadius: 'var(--r-6)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-tooltip)',
      pointerEvents: 'none'
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  indeterminate = false,
  id,
  className = '',
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const filled = on || indeterminate;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": indeterminate ? 'mixed' : on,
    id: id,
    disabled: disabled,
    onClick: () => {
      if (disabled) return;
      if (!isControlled) setInternal(v => !v);
      onChange && onChange(!on);
    },
    className: className,
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      borderRadius: 'var(--r-6)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: filled ? 'none' : '1px solid var(--stroke-sub-300)',
      background: filled ? 'var(--primary-base)' : 'var(--bg-white-0)',
      color: '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      padding: 0,
      transition: 'background .12s ease, border-color .12s ease',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), indeterminate ? /*#__PURE__*/React.createElement("i", {
    className: "ri-subtract-line",
    style: {
      fontSize: 16,
      lineHeight: 1
    }
  }) : on && /*#__PURE__*/React.createElement("i", {
    className: "ri-check-line",
    style: {
      fontSize: 16,
      lineHeight: 1
    }
  }));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Hint.jsx
try { (() => {
/** Helper / validation text shown under a field. */
function Hint({
  children,
  state = 'default',
  icon = 'information-line',
  className = '',
  style = {}
}) {
  const color = state === 'error' ? 'var(--red-base)' : state === 'success' ? 'var(--green-base)' : 'var(--text-soft-400)';
  const ic = state === 'error' ? 'error-warning-line' : state === 'success' ? 'checkbox-circle-line' : icon;
  return /*#__PURE__*/React.createElement("div", {
    className: `text-paragraph-xs ${className}`,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color,
      ...style
    }
  }, ic && /*#__PURE__*/React.createElement("i", {
    className: `ri-${ic}`,
    style: {
      fontSize: 16,
      lineHeight: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Hint });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Hint.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  small: {
    height: 36,
    radius: 'var(--r-8)',
    padX: 10,
    font: 14,
    icon: 18
  },
  medium: {
    height: 40,
    radius: 'var(--r-10)',
    padX: 12,
    font: 14,
    icon: 20
  },
  large: {
    height: 48,
    radius: 'var(--r-12)',
    padX: 14,
    font: 16,
    icon: 20
  }
};
function Input({
  size = 'medium',
  leadingIcon,
  trailingIcon,
  error = false,
  disabled = false,
  value,
  defaultValue,
  placeholder,
  onChange,
  className = '',
  style = {},
  inputStyle = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--red-base)' : focus ? 'var(--primary-base)' : 'var(--stroke-soft-200)';
  const ring = error ? 'var(--ring-error)' : 'var(--ring-primary)';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: sz.height,
      padding: `0 ${sz.padX}px`,
      borderRadius: sz.radius,
      background: disabled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      border: `1px solid ${borderColor}`,
      boxShadow: focus ? ring : 'none',
      transition: 'border-color .15s ease, box-shadow .15s ease',
      boxSizing: 'border-box',
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: {
      fontSize: sz.icon,
      color: 'var(--icon-soft-400)',
      lineHeight: 1
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: sz.font,
      color: 'var(--text-main-900)',
      letterSpacing: '-0.006em',
      ...inputStyle
    }
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${trailingIcon}`,
    style: {
      fontSize: sz.icon,
      color: 'var(--icon-soft-400)',
      lineHeight: 1
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Label.jsx
try { (() => {
/** Form field label. Optional required asterisk and muted sub-label. */
function Label({
  children,
  htmlFor,
  required = false,
  sublabel,
  disabled = false,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    className: `text-label-sm ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--text-main-900)',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, children, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary-base)'
    }
  }, "*"), sublabel && /*#__PURE__*/React.createElement("span", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, sublabel));
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Label.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  disabled = false,
  id,
  className = '',
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "radio",
    "aria-checked": on,
    id: id,
    disabled: disabled,
    onClick: () => {
      if (disabled) return;
      if (!isControlled) setInternal(true);
      onChange && onChange(value ?? true);
    },
    className: className,
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      borderRadius: 'var(--r-full)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${on ? 'var(--primary-base)' : 'var(--stroke-sub-300)'}`,
      background: 'var(--bg-white-0)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      padding: 0,
      transition: 'border-color .12s ease',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 'var(--r-full)',
      background: 'var(--primary-base)',
      transform: on ? 'scale(1)' : 'scale(0)',
      transition: 'transform .12s ease'
    }
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  small: {
    height: 36,
    radius: 'var(--r-8)',
    padX: 10,
    font: 14,
    icon: 18
  },
  medium: {
    height: 40,
    radius: 'var(--r-10)',
    padX: 12,
    font: 14,
    icon: 20
  },
  large: {
    height: 48,
    radius: 'var(--r-12)',
    padX: 14,
    font: 16,
    icon: 20
  }
};

/** Lightweight styled select. Pass options as [{value,label}] or use children <option>. */
function Select({
  size = 'medium',
  leadingIcon,
  error = false,
  disabled = false,
  value,
  defaultValue,
  onChange,
  options,
  placeholder,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--red-base)' : focus ? 'var(--primary-base)' : 'var(--stroke-soft-200)';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: sz.height,
      padding: `0 ${sz.padX}px`,
      borderRadius: sz.radius,
      background: disabled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      border: `1px solid ${borderColor}`,
      boxShadow: focus ? error ? 'var(--ring-error)' : 'var(--ring-primary)' : 'none',
      transition: 'border-color .15s ease, box-shadow .15s ease',
      boxSizing: 'border-box',
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("i", {
    className: `ri-${leadingIcon}`,
    style: {
      fontSize: sz.icon,
      color: 'var(--icon-soft-400)',
      lineHeight: 1
    }
  }), /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      appearance: 'none',
      WebkitAppearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: sz.font,
      color: 'var(--text-main-900)',
      letterSpacing: '-0.006em',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder), options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-down-s-line",
    style: {
      fontSize: sz.icon,
      color: 'var(--icon-soft-400)',
      lineHeight: 1,
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  small: {
    w: 32,
    h: 20,
    knob: 16
  },
  medium: {
    w: 40,
    h: 24,
    knob: 20
  }
};
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'medium',
  id,
  className = '',
  style = {},
  ...rest
}) {
  const sz = SIZES[size] || SIZES.medium;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    id: id,
    disabled: disabled,
    onClick: () => {
      if (disabled) return;
      if (!isControlled) setInternal(v => !v);
      onChange && onChange(!on);
    },
    className: className,
    style: {
      width: sz.w,
      height: sz.h,
      flex: '0 0 auto',
      borderRadius: 'var(--r-full)',
      border: 'none',
      padding: 2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: on ? 'var(--primary-base)' : 'var(--neutral-300)',
      opacity: disabled ? 0.5 : 1,
      transition: 'background .18s ease',
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: sz.knob,
      height: sz.knob,
      borderRadius: 'var(--r-full)',
      background: '#fff',
      boxShadow: 'var(--shadow-toggle)',
      transform: on ? `translateX(${sz.w - sz.knob - 4}px)` : 'translateX(0)',
      transition: 'transform .18s ease'
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  error = false,
  disabled = false,
  rows = 4,
  value,
  defaultValue,
  placeholder,
  onChange,
  showCounter = false,
  maxLength,
  className = '',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const [len, setLen] = React.useState((value ?? defaultValue ?? '').length);
  const borderColor = error ? 'var(--red-base)' : focus ? 'var(--primary-base)' : 'var(--stroke-soft-200)';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      borderRadius: 'var(--r-12)',
      background: disabled ? 'var(--bg-weak-100)' : 'var(--bg-white-0)',
      border: `1px solid ${borderColor}`,
      boxShadow: focus ? error ? 'var(--ring-error)' : 'var(--ring-primary)' : 'none',
      transition: 'border-color .15s ease, box-shadow .15s ease',
      padding: 12,
      boxSizing: 'border-box',
      opacity: disabled ? 0.6 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    maxLength: maxLength,
    onChange: e => {
      setLen(e.target.value.length);
      onChange && onChange(e);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      border: 'none',
      outline: 'none',
      resize: 'vertical',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-main-900)',
      letterSpacing: '-0.006em',
      boxSizing: 'border-box',
      display: 'block'
    }
  }, rest)), showCounter && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      marginTop: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-soft-400)'
    }
  }, len, maxLength ? ` / ${maxLength}` : ''));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/App.jsx
try { (() => {
// App shell — ties views together with simple state routing.
const {
  Banner,
  Button
} = window.AlignUIDesignSystem_6ff166;
function App() {
  const [authed, setAuthed] = React.useState(false);
  const [view, setView] = React.useState('dashboard');
  const [patient, setPatient] = React.useState(null);
  const [showBanner, setShowBanner] = React.useState(true);
  if (!authed) return /*#__PURE__*/React.createElement(LoginView, {
    onSignIn: () => setAuthed(true)
  });
  const openPatient = p => {
    setPatient(p || window.MP_DATA.patients[0]);
    setView('patientDetail');
  };
  const navigate = id => {
    setView(id);
    setPatient(null);
  };
  let content;
  if (view === 'dashboard') content = /*#__PURE__*/React.createElement(DashboardView, {
    onOpenPatient: () => openPatient()
  });else if (view === 'patients') content = /*#__PURE__*/React.createElement(PatientsView, {
    onOpenPatient: openPatient
  });else if (view === 'patientDetail') content = /*#__PURE__*/React.createElement(PatientDetailView, {
    patient: patient,
    onBack: () => setView('patients')
  });else content = /*#__PURE__*/React.createElement(PatientsView, {
    onOpenPatient: openPatient
  });
  const topbarView = view === 'patientDetail' ? 'patientDetail' : view;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: 'var(--bg-weak-100)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: view === 'patientDetail' ? 'patients' : view,
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    view: topbarView,
    onNewAppointment: () => {}
  }), showBanner && /*#__PURE__*/React.createElement(Banner, {
    state: "feature",
    onClose: () => setShowBanner(false),
    action: /*#__PURE__*/React.createElement(Button, {
      size: "xsmall",
      variant: "primary",
      mode: "lighter"
    }, "Try it")
  }, "New: AI-assisted triage summaries are now available on patient records."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, content)));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/DashboardView.jsx
try { (() => {
// Dashboard view — stat widgets, today's schedule, quick panels.
const {
  Card,
  Badge,
  Avatar,
  StatusBadge,
  Button,
  LinkButton,
  ProgressBar,
  Tabs
} = window.AlignUIDesignSystem_6ff166;
function StatCard({
  s
}) {
  const tint = {
    blue: ['var(--blue-lighter)', 'var(--blue-base)'],
    green: ['var(--green-lighter)', 'var(--green-base)'],
    orange: ['var(--orange-lighter)', 'var(--orange-base)'],
    purple: ['var(--purple-lighter)', 'var(--purple-base)']
  }[s.color];
  return /*#__PURE__*/React.createElement(Card, {
    padding: 18,
    hover: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--r-10)',
      background: tint[0],
      color: tint[1],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `ri-${s.icon}`,
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement(Badge, {
    color: s.up ? 'green' : 'red',
    variant: "light",
    size: "small",
    leadingIcon: s.up ? 'arrow-up-line' : 'arrow-down-line'
  }, s.delta)), /*#__PURE__*/React.createElement("div", {
    className: "text-title-h4",
    style: {
      color: 'var(--text-main-900)',
      marginTop: 14
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-soft-400)',
      marginTop: 2
    }
  }, s.label));
}
function ScheduleRow({
  a,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 0',
      borderBottom: '1px solid var(--stroke-soft-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      width: 48,
      color: 'var(--text-sub-500)'
    }
  }, a.time), /*#__PURE__*/React.createElement(Avatar, {
    initials: a.initials,
    color: a.color,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      color: 'var(--text-main-900)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, a.name, a.video && /*#__PURE__*/React.createElement("i", {
    className: "ri-vidicon-line",
    style: {
      fontSize: 16,
      color: 'var(--primary-base)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-xs",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, a.reason, " \xB7 ", a.dur)), /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.status
  }), /*#__PURE__*/React.createElement(Button, {
    size: "xsmall",
    variant: "neutral",
    mode: "stroke",
    onClick: () => onOpen && onOpen()
  }, "Open"));
}
function DashboardView({
  onOpenPatient
}) {
  const d = window.MP_DATA;
  const [tab, setTab] = React.useState('today');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, d.stats.map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s.id,
    s: s
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-lg",
    style: {
      color: 'var(--text-main-900)'
    }
  }, "Today's schedule"), /*#__PURE__*/React.createElement(LinkButton, {
    trailingIcon: "arrow-right-s-line"
  }, "Full calendar")), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    variant: "pill",
    items: [{
      value: 'today',
      label: 'Today',
      badge: d.schedule.length
    }, {
      value: 'week',
      label: 'This week'
    }, {
      value: 'tele',
      label: 'Telemedicine'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, d.schedule.map((a, i) => /*#__PURE__*/React.createElement(ScheduleRow, {
    key: i,
    a: a,
    onOpen: onOpenPatient
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-md",
    style: {
      color: 'var(--text-main-900)',
      marginBottom: 14
    }
  }, "Patient vitals \xB7 A. \u0418\u0432\u0430\u043D\u043E\u0432\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, d.vitals.map((v, i) => {
    const c = {
      red: 'var(--red-base)',
      primary: 'var(--primary-base)',
      orange: 'var(--orange-base)',
      green: 'var(--green-base)'
    }[v.color];
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `ri-${v.icon}`,
      style: {
        fontSize: 18,
        color: c
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-paragraph-sm",
      style: {
        flex: 1,
        color: 'var(--text-sub-500)'
      }
    }, v.label), /*#__PURE__*/React.createElement("span", {
      className: "text-label-sm",
      style: {
        color: 'var(--text-main-900)'
      }
    }, v.value, " ", /*#__PURE__*/React.createElement("span", {
      className: "text-paragraph-xs",
      style: {
        color: 'var(--text-soft-400)'
      }
    }, v.unit))), /*#__PURE__*/React.createElement(ProgressBar, {
      value: v.trend,
      color: v.color,
      size: "small"
    }));
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--r-10)',
      background: 'var(--green-lighter)',
      color: 'var(--green-base)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-shield-check-line",
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      color: 'var(--text-main-900)'
    }
  }, "Records up to date"), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-xs",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, "Last synced 4 minutes ago")))))));
}
window.DashboardView = DashboardView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/DashboardView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/LoginView.jsx
try { (() => {
// Login — split brand panel + sign-in form.
const {
  Input,
  Button,
  FancyButton,
  Checkbox,
  Label,
  Divider,
  Badge
} = window.AlignUIDesignSystem_6ff166;
function LoginView({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: 'var(--bg-white-0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 44%',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, var(--primary-base), var(--primary-darker))',
      color: '#fff',
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: 'rgba(255,255,255,.16)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-heart-pulse-fill",
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: '-0.02em'
    }
  }, "\u041C\u0435\u0434\u043F\u043E\u0440\u0442\u0430\u043B")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 36,
      lineHeight: '44px',
      letterSpacing: '-0.01em'
    }
  }, "Care, coordinated."), /*#__PURE__*/React.createElement("p", {
    className: "text-paragraph-lg",
    style: {
      color: 'rgba(255,255,255,.78)',
      marginTop: 12,
      maxWidth: 360
    }
  }, "One secure workspace for appointments, records and patient communication."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    color: "teal",
    variant: "filled",
    leadingIcon: "shield-check-line"
  }, "HIPAA compliant"), /*#__PURE__*/React.createElement(Badge, {
    color: "green",
    variant: "filled",
    leadingIcon: "lock-2-line"
  }, "End-to-end encrypted"))), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      color: 'rgba(255,255,255,.6)'
    }
  }, "\xA9 2026 \u041C\u0435\u0434\u043F\u043E\u0440\u0442\u0430\u043B Clinic Systems"), /*#__PURE__*/React.createElement("i", {
    className: "ri-pulse-line",
    style: {
      position: 'absolute',
      right: -40,
      bottom: -30,
      fontSize: 280,
      color: 'rgba(255,255,255,.06)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-title-h4",
    style: {
      color: 'var(--text-main-900)'
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    className: "text-paragraph-md",
    style: {
      color: 'var(--text-soft-400)',
      marginTop: 6
    }
  }, "Sign in to your clinician account."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "email"
  }, "Email address"), /*#__PURE__*/React.createElement(Input, {
    id: "email",
    leadingIcon: "mail-line",
    defaultValue: "e.petrova@medportal.ru"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "pw"
  }, "Password"), /*#__PURE__*/React.createElement(Input, {
    id: "pw",
    type: "password",
    leadingIcon: "lock-2-line",
    trailingIcon: "eye-off-line",
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-sub-500)'
    }
  }, "Remember me")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-label-sm",
    style: {
      color: 'var(--primary-base)',
      textDecoration: 'none'
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(FancyButton, {
    variant: "primary",
    fullWidth: true,
    onClick: onSignIn
  }, "Sign in"), /*#__PURE__*/React.createElement(Divider, null, "or"), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    mode: "stroke",
    fullWidth: true,
    leadingIcon: "government-line"
  }, "Continue with clinic SSO")))));
}
window.LoginView = LoginView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/LoginView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/PatientDetailView.jsx
try { (() => {
// Patient detail — record header, tabs, vitals, history.
const {
  Card,
  Avatar,
  Badge,
  StatusBadge,
  Button,
  IconButton,
  Tabs,
  Accordion,
  Alert,
  Breadcrumbs,
  ProgressBar,
  Divider,
  LinkButton
} = window.AlignUIDesignSystem_6ff166;
function InfoCell({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-subheading-2xs",
    style: {
      color: 'var(--text-soft-400)',
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      color: 'var(--text-main-900)'
    }
  }, value));
}
function PatientDetailView({
  patient,
  onBack
}) {
  const p = patient || window.MP_DATA.patients[0];
  const d = window.MP_DATA;
  const [tab, setTab] = React.useState('overview');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-left-line",
    variant: "neutral",
    mode: "stroke",
    onClick: onBack
  }), /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: [{
      label: 'Patients',
      icon: 'group-line'
    }, {
      label: p.name
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: p.initials,
    color: p.color,
    size: 64,
    status: p.status
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-title-h5",
    style: {
      color: 'var(--text-main-900)'
    }
  }, p.name), /*#__PURE__*/React.createElement(Badge, {
    color: "teal",
    variant: "light",
    leadingIcon: "verified-badge-fill"
  }, "Verified")), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-soft-400)',
      marginTop: 2
    }
  }, p.id, " \xB7 ", p.age, " years \xB7 ", p.condition)), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    mode: "stroke",
    leadingIcon: "message-3-line"
  }, "Message"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leadingIcon: "calendar-line"
  }, "Schedule visit")), /*#__PURE__*/React.createElement(Divider, {
    style: {
      margin: '18px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(InfoCell, {
    label: "Risk level",
    value: /*#__PURE__*/React.createElement(StatusBadge, {
      color: "var(--orange-base)"
    }, "Moderate")
  }), /*#__PURE__*/React.createElement(InfoCell, {
    label: "Blood type",
    value: "A+ (Rh positive)"
  }), /*#__PURE__*/React.createElement(InfoCell, {
    label: "Primary physician",
    value: "Dr. E. Petrova"
  }), /*#__PURE__*/React.createElement(InfoCell, {
    label: "Insurance",
    value: "Active \xB7 MED-4471"
  }))), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'overview',
      label: 'Overview',
      icon: 'profile-line'
    }, {
      value: 'visits',
      label: 'Visits',
      icon: 'calendar-line',
      badge: 8
    }, {
      value: 'labs',
      label: 'Lab results',
      icon: 'test-tube-line'
    }, {
      value: 'rx',
      label: 'Prescriptions',
      icon: 'capsule-line'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    state: "warning",
    title: "Medication interaction flagged",
    variant: "light"
  }, "Atorvastatin may interact with current Amiodarone dosage. Review before next prescription."), /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-md",
    style: {
      color: 'var(--text-main-900)',
      marginBottom: 14
    }
  }, "Latest vitals"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, d.vitals.map((v, i) => {
    const c = {
      red: 'var(--red-base)',
      primary: 'var(--primary-base)',
      orange: 'var(--orange-base)',
      green: 'var(--green-base)'
    }[v.color];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        border: '1px solid var(--stroke-soft-200)',
        borderRadius: 'var(--r-12)',
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `ri-${v.icon}`,
      style: {
        fontSize: 18,
        color: c
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-paragraph-sm",
      style: {
        color: 'var(--text-soft-400)'
      }
    }, v.label)), /*#__PURE__*/React.createElement("div", {
      className: "text-title-h6",
      style: {
        color: 'var(--text-main-900)'
      }
    }, v.value, " ", /*#__PURE__*/React.createElement("span", {
      className: "text-paragraph-xs",
      style: {
        color: 'var(--text-soft-400)'
      }
    }, v.unit)), /*#__PURE__*/React.createElement(ProgressBar, {
      value: v.trend,
      color: v.color,
      size: "small",
      style: {
        marginTop: 10
      }
    }));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Accordion, {
    title: "Medical history",
    icon: "file-list-3-line",
    defaultOpen: true
  }, "Hypertension diagnosed 2019. Myocardial infarction 2021, stent placed. No known drug allergies."), /*#__PURE__*/React.createElement(Accordion, {
    title: "Current medications",
    icon: "capsule-line"
  }, "Amiodarone 200mg \xB7 Lisinopril 10mg \xB7 Aspirin 75mg daily."), /*#__PURE__*/React.createElement(Accordion, {
    title: "Family history",
    icon: "parent-line"
  }, "Father \u2014 coronary artery disease. Mother \u2014 type 2 diabetes."))));
}
window.PatientDetailView = PatientDetailView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/PatientDetailView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/PatientsView.jsx
try { (() => {
// Patients view — searchable table with filters & pagination.
const {
  Card,
  Avatar,
  Badge,
  StatusBadge,
  Button,
  IconButton,
  Input,
  Select,
  Pagination,
  Checkbox,
  Tag
} = window.AlignUIDesignSystem_6ff166;
function RiskBadge({
  risk
}) {
  const map = {
    High: 'red',
    Moderate: 'orange',
    Low: 'green'
  };
  return /*#__PURE__*/React.createElement(Badge, {
    color: map[risk] || 'gray',
    variant: "light",
    size: "medium",
    dot: true
  }, risk);
}
function PatientsView({
  onOpenPatient
}) {
  const rows = window.MP_DATA.patients;
  const [page, setPage] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 16,
      borderBottom: '1px solid var(--stroke-soft-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280
    }
  }, /*#__PURE__*/React.createElement(Input, {
    leadingIcon: "search-line",
    placeholder: "Search by name or ID\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 170
    }
  }, /*#__PURE__*/React.createElement(Select, {
    leadingIcon: "filter-3-line",
    defaultValue: "all",
    options: [{
      value: 'all',
      label: 'All conditions'
    }, {
      value: 'htn',
      label: 'Hypertension'
    }, {
      value: 'cad',
      label: 'Coronary'
    }]
  })), /*#__PURE__*/React.createElement(Tag, {
    variant: "gray",
    leadingIcon: "user-heart-line",
    onDismiss: () => {}
  }, "High risk"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    mode: "stroke",
    leadingIcon: "download-2-line"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leadingIcon: "user-add-line"
  }, "Add patient")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: 760
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--bg-weak-100)'
    }
  }, ['', 'Patient', 'Patient ID', 'Condition', 'Risk', 'Last visit', 'Status', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    className: "text-subheading-2xs",
    style: {
      textAlign: i === 0 ? 'center' : 'left',
      color: 'var(--text-soft-400)',
      padding: '10px 16px',
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((p, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: '1px solid var(--stroke-soft-200)',
      cursor: 'pointer'
    },
    onClick: () => onOpenPatient && onOpenPatient(p)
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center',
      padding: '12px 16px'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Checkbox, null)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: p.initials,
    color: p.color,
    size: 36,
    status: p.status
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      color: 'var(--text-main-900)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-xs",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, p.age, " yrs")))), /*#__PURE__*/React.createElement("td", {
    className: "text-paragraph-sm",
    style: {
      padding: '12px 16px',
      color: 'var(--text-sub-500)',
      whiteSpace: 'nowrap'
    }
  }, p.id), /*#__PURE__*/React.createElement("td", {
    className: "text-paragraph-sm",
    style: {
      padding: '12px 16px',
      color: 'var(--text-main-900)'
    }
  }, p.condition), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement(RiskBadge, {
    risk: p.risk
  })), /*#__PURE__*/React.createElement("td", {
    className: "text-paragraph-sm",
    style: {
      padding: '12px 16px',
      color: 'var(--text-soft-400)',
      whiteSpace: 'nowrap'
    }
  }, p.last), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: p.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 16px'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "more-2-fill",
    variant: "neutral",
    mode: "ghost",
    size: "small"
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, "Showing 1\u20136 of 328 patients"), /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    total: 55,
    onChange: setPage
  }))));
}
window.PatientsView = PatientsView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/PatientsView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/Sidebar.jsx
try { (() => {
// Sidebar — clinic portal left navigation.
const {
  Avatar,
  Badge
} = window.AlignUIDesignSystem_6ff166;
const NAV = [{
  section: 'Clinic',
  items: [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard-line'
  }, {
    id: 'appointments',
    label: 'Appointments',
    icon: 'calendar-line',
    badge: '14'
  }, {
    id: 'patients',
    label: 'Patients',
    icon: 'group-line'
  }, {
    id: 'labs',
    label: 'Lab results',
    icon: 'test-tube-line',
    dot: true
  }]
}, {
  section: 'Care',
  items: [{
    id: 'messages',
    label: 'Messages',
    icon: 'chat-3-line',
    badge: '5'
  }, {
    id: 'prescriptions',
    label: 'Prescriptions',
    icon: 'capsule-line'
  }, {
    id: 'records',
    label: 'Medical records',
    icon: 'folder-3-line'
  }]
}];
function NavItem({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const on = active === item.id;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onClick(item.id),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      padding: '9px 12px',
      borderRadius: 'var(--r-8)',
      border: 'none',
      background: on ? 'var(--bg-weak-100)' : hover ? 'var(--bg-weak-100)' : 'transparent',
      cursor: 'pointer',
      textAlign: 'left',
      position: 'relative'
    }
  }, on && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -16,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: 3,
      background: 'var(--primary-base)'
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: `ri-${item.icon}`,
    style: {
      fontSize: 20,
      color: on ? 'var(--primary-base)' : 'var(--icon-soft-400)',
      lineHeight: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-label-sm",
    style: {
      flex: 1,
      color: on ? 'var(--text-main-900)' : 'var(--text-sub-500)'
    }
  }, item.label), item.badge && /*#__PURE__*/React.createElement(Badge, {
    color: on ? 'blue' : 'gray',
    variant: "light",
    size: "small"
  }, item.badge), item.dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--red-base)'
    }
  }));
}
function Sidebar({
  active,
  onNavigate
}) {
  const u = window.MP_DATA.user;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 264,
      flex: '0 0 264px',
      height: '100%',
      background: 'var(--bg-white-0)',
      borderRight: '1px solid var(--stroke-soft-200)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 4px 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: 'var(--primary-base)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 -4px 8px rgba(255,255,255,.24)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-heart-pulse-fill",
    style: {
      fontSize: 22
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 18,
      letterSpacing: '-0.02em',
      color: 'var(--text-main-900)'
    }
  }, "\u041C\u0435\u0434", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary-base)'
    }
  }, "\u043F\u043E\u0440\u0442\u0430\u043B"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, NAV.map(grp => /*#__PURE__*/React.createElement("div", {
    key: grp.section
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-subheading-2xs",
    style: {
      color: 'var(--text-soft-400)',
      padding: '0 12px 6px'
    }
  }, grp.section), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, grp.items.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.id,
    item: it,
    active: active,
    onClick: onNavigate
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--stroke-soft-200)',
      paddingTop: 12,
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: u.initials,
    color: u.color,
    size: 40,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-sm",
    style: {
      color: 'var(--text-main-900)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, u.name), /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-xs",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, u.role)), /*#__PURE__*/React.createElement("i", {
    className: "ri-more-2-fill",
    style: {
      fontSize: 20,
      color: 'var(--icon-soft-400)',
      cursor: 'pointer'
    }
  })));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/Topbar.jsx
try { (() => {
// Topbar — page title, search, quick actions.
const {
  Input,
  IconButton,
  Button,
  Avatar
} = window.AlignUIDesignSystem_6ff166;
const TITLES = {
  dashboard: {
    title: 'Dashboard',
    sub: 'Thursday, 13 June 2026'
  },
  appointments: {
    title: 'Appointments',
    sub: 'Manage your schedule'
  },
  patients: {
    title: 'Patients',
    sub: '328 active records'
  },
  patientDetail: {
    title: 'Patient record',
    sub: 'Cardiology'
  },
  labs: {
    title: 'Lab results',
    sub: '7 awaiting review'
  },
  messages: {
    title: 'Messages',
    sub: '5 unread'
  },
  prescriptions: {
    title: 'Prescriptions',
    sub: ''
  },
  records: {
    title: 'Medical records',
    sub: ''
  }
};
function Topbar({
  view,
  onNewAppointment
}) {
  const t = TITLES[view] || TITLES.dashboard;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 28px',
      borderBottom: '1px solid var(--stroke-soft-200)',
      background: 'var(--bg-white-0)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-label-lg",
    style: {
      color: 'var(--text-main-900)'
    }
  }, t.title), t.sub && /*#__PURE__*/React.createElement("div", {
    className: "text-paragraph-sm",
    style: {
      color: 'var(--text-soft-400)'
    }
  }, t.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      maxWidth: '32vw'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "medium",
    leadingIcon: "search-line",
    placeholder: "Search patients, records\u2026"
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "notification-3-line",
    variant: "neutral",
    mode: "stroke"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "question-line",
    variant: "neutral",
    mode: "stroke"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leadingIcon: "add-line",
    onClick: onNewAppointment
  }, "New appointment"));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/medical-portal/data.js
try { (() => {
// Mock data for the Медпортал clinic portal UI kit.
window.MP_DATA = {
  user: {
    name: 'Dr. Elena Petrova',
    role: 'Cardiologist',
    initials: 'EP',
    color: 'purple'
  },
  stats: [{
    id: 'appts',
    label: "Today's appointments",
    value: '14',
    delta: '+3',
    up: true,
    icon: 'calendar-line',
    color: 'blue'
  }, {
    id: 'patients',
    label: 'Active patients',
    value: '328',
    delta: '+12',
    up: true,
    icon: 'group-line',
    color: 'green'
  }, {
    id: 'pending',
    label: 'Pending lab results',
    value: '7',
    delta: '-2',
    up: false,
    icon: 'test-tube-line',
    color: 'orange'
  }, {
    id: 'messages',
    label: 'Unread messages',
    value: '5',
    delta: '+5',
    up: true,
    icon: 'chat-3-line',
    color: 'purple'
  }],
  schedule: [{
    time: '09:00',
    name: 'Анна Иванова',
    initials: 'АИ',
    color: 'blue',
    reason: 'Follow-up · Hypertension',
    status: 'completed',
    dur: '30 min'
  }, {
    time: '09:45',
    name: 'Михаил Соколов',
    initials: 'МС',
    color: 'green',
    reason: 'ECG review',
    status: 'completed',
    dur: '20 min'
  }, {
    time: '10:30',
    name: 'Ольга Кузнецова',
    initials: 'ОК',
    color: 'orange',
    reason: 'New consultation',
    status: 'in_progress',
    dur: '45 min'
  }, {
    time: '11:30',
    name: 'Дмитрий Орлов',
    initials: 'ДО',
    color: 'purple',
    reason: 'Post-op check',
    status: 'pending',
    dur: '30 min'
  }, {
    time: '13:00',
    name: 'Елена Морозова',
    initials: 'ЕМ',
    color: 'yellow',
    reason: 'Cholesterol panel',
    status: 'pending',
    dur: '20 min'
  }, {
    time: '14:30',
    name: 'Сергей Волков',
    initials: 'СВ',
    color: 'green',
    reason: 'Telemedicine · Arrhythmia',
    status: 'pending',
    dur: '30 min',
    video: true
  }],
  patients: [{
    name: 'Анна Иванова',
    initials: 'АИ',
    color: 'blue',
    age: 54,
    id: 'PT-10293',
    condition: 'Hypertension',
    risk: 'Moderate',
    last: '2 days ago',
    status: 'online'
  }, {
    name: 'Михаил Соколов',
    initials: 'МС',
    color: 'green',
    age: 61,
    id: 'PT-10288',
    condition: 'Coronary artery disease',
    risk: 'High',
    last: '4 hours ago',
    status: 'offline'
  }, {
    name: 'Ольга Кузнецова',
    initials: 'ОК',
    color: 'orange',
    age: 43,
    id: 'PT-10301',
    condition: 'Arrhythmia',
    risk: 'Low',
    last: 'Today',
    status: 'online'
  }, {
    name: 'Дмитрий Орлов',
    initials: 'ДО',
    color: 'purple',
    age: 38,
    id: 'PT-10277',
    condition: 'Post-operative care',
    risk: 'Moderate',
    last: '1 week ago',
    status: 'away'
  }, {
    name: 'Елена Морозова',
    initials: 'ЕМ',
    color: 'yellow',
    age: 49,
    id: 'PT-10312',
    condition: 'Hyperlipidemia',
    risk: 'Low',
    last: '3 days ago',
    status: 'offline'
  }, {
    name: 'Сергей Волков',
    initials: 'СВ',
    color: 'green',
    age: 57,
    id: 'PT-10266',
    condition: 'Atrial fibrillation',
    risk: 'High',
    last: 'Yesterday',
    status: 'online'
  }],
  vitals: [{
    label: 'Blood pressure',
    value: '128 / 84',
    unit: 'mmHg',
    icon: 'heart-pulse-line',
    color: 'red',
    trend: 72
  }, {
    label: 'Heart rate',
    value: '74',
    unit: 'bpm',
    icon: 'pulse-line',
    color: 'primary',
    trend: 60
  }, {
    label: 'Cholesterol',
    value: '198',
    unit: 'mg/dL',
    icon: 'drop-line',
    color: 'orange',
    trend: 48
  }, {
    label: 'BMI',
    value: '24.6',
    unit: 'kg/m²',
    icon: 'scales-2-line',
    color: 'green',
    trend: 55
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/medical-portal/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FancyButton = __ds_scope.FancyButton;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.LinkButton = __ds_scope.LinkButton;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Hint = __ds_scope.Hint;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
