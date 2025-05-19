# 🧠 Trivia Game

Este es un juego interactivo de preguntas y respuestas desarrollado con **React**, ideal para poner a prueba tus conocimientos de forma divertida, ya sea en solitario o contra otra persona.

## 🎮 Modos de juego

### 🕹️ Modo Clásico
- Jugás solo contra el tiempo.
- Tratá de responder la mayor cantidad de preguntas posibles antes de que se termine el tiempo.
- Tu objetivo es superar tu **mejor puntaje histórico**.

### 👥 Modo Batalla (1 vs 1)
- Dos jugadores compiten entre sí.
- Gana quien obtenga **más respuestas correctas** antes de que se acabe el tiempo o se terminen las preguntas.
- ¡Puede haber empate!

## 🏁 Fin del juego

- Si el tiempo se agota, se mostrará un mensaje de **Game Over**.
- En modo Batalla, si se acaba el tiempo, **gana el otro jugador automáticamente**.
- Si un jugador supera su mejor puntaje histórico, ¡aparecen confetis de celebración! 🎉

## 🚀 Funcionalidades

- Puntuación en tiempo real.
- Mejores puntajes guardados en `localStorage`.
- Efectos visuales para la victoria.
- Reinicio rápido y opción de volver al inicio.
- Diseño responsive y atractivo.

## 🛠️ Tecnologías usadas

- React
- TypeScript
- TailwindCSS
- Confetti (librería de efectos visuales)

## ▶️ Cómo ejecutar el proyecto

Editar .env con la url para obtener las preguntas

```bash
npm install
npm run dev
```

## Decisiones Tomadas

- Decidí tener una separación clara de componentes: se modularizó la UI en componentes reutilizables (Button, LoadingScreen, EndGameScreen, etc.) para mantener el código limpio y escalable

- Se utiliza localStorage para guardar el mejor puntaje del usuario, incluso si recarga o reinicia el juego

- El modo Batalla se diseñó con soporte opcional para player2, permitiendo que el juego funcione en modo clásico o multijugador sin duplicar lógica

- Se priorizó una UX clara para cada etapa del juego: inicio, juego activo, fin del juego y reinicio

- El confetti aparece solo si se supera un récord anterior, para no abusar del efecto visual

- En caso de que se termine el tiempo, el otro jugador gana automáticamente si está en modo Versus, para mantener la lógica competitiva
