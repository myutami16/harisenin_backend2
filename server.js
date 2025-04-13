const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const pool = require("./model/db");

pool.query("SELECT NOW()", (err, res) => {
	if (err) {
		console.error("❌ Gagal konek DB:", err);
	} else {
		console.log("✅ Terkoneksi ke DB:", res.rows[0]);
	}
	pool.end();
});
