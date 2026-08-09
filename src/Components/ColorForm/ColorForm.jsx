export default function ColorForm() {

    const [newColor, setNewColor] = useState({
        role: "primary",
        hex: "#000000",
        contrastText: "#ffffff",
    });

    return (
        <form>
            <h2>Add a Color Card</h2>
            <label htmlFor="role">Role</label>
            <input
                type="text"
                id="role"
                name="role"
                placeholder="primary"
            />

            <label htmlFor="hex">Hex value</label>

            <input
                type="color"
                id="hex-color"
                name="hex-color"
            />
            <input
                type="text"
                id="hex"
                name="hex"
                placeholder="#ff0000"
            />

            <label htmlFor="contrast-text">Contrast text</label>
            <input
                type="color"
                id="contrast-color"
                name="contrast-color"
            />
            <input
                type="text"
                id="contrast-text"
                name="contrast-text"
                placeholder="#ffffff"
            />

            <button type="submit">Add color</button>
        </form>
    );
}