# Taco Tasks

Taco Tasks is a powerful and visually appealing task management application built with Next.js, TypeScript, and Tailwind CSS. It comes packed with features such as dark mode, drag-and-drop functionality, and a beautiful particle background effect to enhance the user experience.

## 🚀 Features

- **Task Management**: Easily add, edit, remove, and archive tasks.
- **Search and Filter**: Search tasks by title or description and filter tasks by status.
- **Dark Mode**: Seamlessly toggle between light and dark themes.
- **Confetti Effect**: Celebrate task completion with a fun confetti animation.
- **Particle Background**: Dynamic particle background for a modern look.
- **Drag and Drop**: Effortlessly reorder tasks using drag-and-drop functionality.
- **Lottie Animations**: Enhanced user experience with engaging Lottie animations.
- **Not Found Page**: A custom 404 page that renavigates users to the main site.
- **Archiving and Deleting Tasks**: Archive completed tasks or permanently delete them.
- **Progress Bar**: Visual progress bar to show the user's task completion status.
- **Local Storage**: Stores and persists task data in the browser for seamless experience.

## 🛠️ Technologies Used

- **Next.js**: Framework for building dynamic user interfaces with server-side rendering and static site generation.
- **TypeScript**: Typed superset of JavaScript for improved development experience.
- **Tailwind CSS**: Utility-first CSS framework for fast styling.
- **Framer Motion**: Animation library for smooth transitions.
- **Lottie Files**: JSON-based animations for a better user interface.
- **React DnD**: Drag-and-drop library for reordering tasks.

## 📸 Screenshots

![Taco Tasks Screenshot](/public/screenshots/img1.jpg)

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn (package managers)

### Installation

```bash
# Clone the repository
$ git clone https://github.com/fitiha/tacotasks.git
$ cd taco-tasks

# Install dependencies
$ npm install
# or using yarn
$ yarn install
```

### Running the Application

```bash
# Start the development server
$ npm run dev
# or using yarn
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## 📂 Project Structure

```plaintext
taco-tasks/
├── src/
│   ├── components/
│   │   ├── ParticleBackground.tsx    // Particle background effect
│   │   ├── Confetti.tsx              // Confetti effect for celebrations
│   │   ├── ThemeToggle.tsx           // Toggle for dark and light modes
│   │   ├── SearchBar.tsx             // Search tasks by title or description
│   │   ├── FilterButtons.tsx         // Filter tasks by status
│   │   ├── ProgressGraph.tsx         // Visual representation of progress
│   │   └── TaskList.tsx              // Displays the list of tasks
│   ├── app/
│   │   ├── page.tsx                  // Main page component
│   │   └── layout.tsx                // Layout component
├── public/
│   ├── images/
│   │   └── og-image.png              // Open Graph image
├── styles/
│   └── globals.css                   // Global CSS styles
├── README.md                         // Project documentation
├── package.json                      // Project dependencies and scripts
├── tsconfig.json                     // TypeScript configuration
└── next.config.js                    // Next.js configuration
```

## 🎨 Building for Production

```bash
# Build the application for production
$ npm run build
# or using yarn
$ yarn build
```

This will generate an optimized version of the app in the `.next` directory, ready to be deployed.

## 🤝 Contributing

Contributions are highly welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## 📧 Contact

For any questions or feedback, please reach out at [natnaelfisseha.16@gmail.com].

---

Made with ❤️ by Taco Creatives
