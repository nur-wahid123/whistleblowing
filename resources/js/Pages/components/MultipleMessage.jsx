import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
    Image,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { createTw } from "react-pdf-tailwind";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    title: { fontSize: 24, margin: 10 },
});
function toNow(date) {
    function monthName(month) {
        const name = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "November",
            "Desember",
        ];
        return name[month];
    }
    let time = new Date(date);
    return `${time.getDate()} ${monthName(
        time.getMonth()
    )} ${time.getFullYear()}`;
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
export const downloadPDF = async (data = []) => {
    const doc = (
        <Document>
            {data.map((data, i) => {
                <Page style={styles.page}>
                    <Text style={styles.title}>Laporan Keluhan</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        }}
                    >
                        <Text>Status Pesan : {data.status}</Text>
                        <Text>Nama Pengirim : {data.sender.name}</Text>
                        <Text>Email Pengirim : {data.sender.email}</Text>
                        <Text>Tanggal Dikirim : {toNow(data.created_at)}</Text>
                        <Text>
                            Bagian penerima : {toTitleCase(data.reciever.name)}
                        </Text>
                        <Text>Isi Keluhan : {data.value}</Text>
                        <Text>Bukti Gambar Mahasiswa :</Text>
                        <Image
                            src={`/storage/image/mahasiswa/${data.gambar_mahasiswa}`}
                        />
                        {(data.status == "diterima" ||
                            data.status == "ditolak") && (
                            <View>
                                <Text>
                                    Catatan Dari PIC : {data.catatan_admin}
                                </Text>
                                {data.gambar_admin != null && (
                                    <Image
                                        src={`/storage/image/pic/${data.gambar_admin}`}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </Page>;
            })}
        </Document>
    );
    const blob = await pdf(doc).toBlob();
    saveAs(blob, "my-document.pdf");
};
