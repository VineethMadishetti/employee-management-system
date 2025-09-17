# CSS Organization Structure

This directory contains all the CSS files organized in a clean, maintainable structure for the Employee Management System.

## Folder Structure

```
styles/
├── main.css                 # Main CSS file that imports all other styles
├── variables.css            # CSS custom properties and design system variables
├── base.css                 # Global styles, typography, and utility classes
├── components.css           # Reusable component styles (buttons, cards, forms, etc.)
├── layout/                  # Layout-specific styles
│   ├── main-layout.css     # Main layout and sidebar styles
│   ├── header.css          # Header/navigation styles
│   └── footer.css          # Footer styles
├── pages/                   # Page-specific styles
│   ├── login.css           # Login page styles
│   ├── home.css            # Home page styles
│   └── employee.css        # Employee management page styles
└── features/                # Feature-specific styles (for future use)
```

## Design System

### Variables (`variables.css`)
- **Color Palette**: Primary, secondary, success, warning, danger gradients
- **Neutral Colors**: Background, text, and border colors
- **Shadows**: Small, medium, large, extra-large, and glow effects
- **Border Radius**: Consistent border radius values
- **Transitions**: Fast, normal, and slow transition durations
- **Typography**: Font family and size scale
- **Spacing**: Consistent spacing scale

### Base Styles (`base.css`)
- Global reset and typography
- Animated background
- Utility classes for gradients, animations, and loading states
- Custom scrollbar styling
- Print styles

### Components (`components.css`)
- Premium card designs with glassmorphism
- Button variants with hover effects
- Form controls with custom styling
- Alerts, badges, modals, dropdowns
- Pagination and input groups

### Layout Styles
- **Main Layout**: Sidebar navigation and content area
- **Header**: Navigation bar with brand logo and user info
- **Footer**: Footer with brand information and links

### Page Styles
- **Login**: Animated background and form styling
- **Home**: Feature cards and hero section
- **Employee**: Comprehensive employee management page styling

## Usage

Import the main CSS file in your main entry point:

```javascript
import './styles/main.css';
```

## Benefits

1. **Maintainability**: Clear separation of concerns
2. **Reusability**: Component styles can be easily reused
3. **Scalability**: Easy to add new pages and components
4. **Performance**: Better CSS organization and loading
5. **Readability**: Clean, organized code structure
6. **Consistency**: Centralized design system variables

## Adding New Styles

1. **New Component**: Add styles to `components.css`
2. **New Page**: Create a new file in `pages/` directory
3. **New Layout**: Create a new file in `layout/` directory
4. **New Variables**: Add to `variables.css`
5. **Import**: Add the import to `main.css`

## Best Practices

- Use CSS custom properties from `variables.css`
- Follow the existing naming conventions
- Keep styles modular and focused
- Use consistent spacing and typography
- Test responsive design for all screen sizes
