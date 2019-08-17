{
    function Hamburger(type, calories) {
        this.type = type || 'classic';
        this.calories = calories || 600;
    }
    const myHamburger = new Hamburger('classic', 600);
    console.group('Simple hamburger');
    console.log(myHamburger);
    console.groupEnd();
}