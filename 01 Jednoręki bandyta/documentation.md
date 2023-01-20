Koncepcja:
1. HTML jest zarządzany przez jedną klasę - klasę Game.
2. Klasa Game zarządza aplikacją.
3. W konstruktorze tworzymy instancje naszych klas (prywatne) i podpinamy event listenery. Tutaj 1 event zarządza startem flow. 
4. Metoda start game pobiera wartość inputa i korzysta z metod innych obiektów - wysyła im dane i żąda od nich danych. Tak zgromadzone informacje zostaną przekazane jako parametry do metody render która wyświetli informacje użytkownikowi.

5. Dokładny przebieg odbioru i przekazania informacji znajduje się w startGame.


Flow 

new Game -> constructor() -> eventListener -> pierwszy render() -> startGame() -> pobranieIWysłanieDanych -> metoda render z przesłanymi parametrami uzyskanymi z innych obiektów();