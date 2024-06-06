<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="my-script" data-json="{{ $message }}"></div>
    <div>
        Nama Pengirim : {{ $message->sender->name }}
    </div>
    <div>
        Bagian yang dituju : {{ $message->reciever->name }}
    </div>
    <div>
        Isi Surat : {{ $message->value }}
    </div>
    <div>
        {{-- <img src="/storage/image/mahasiswa/{{ $message->gambar_mahasiswa }}" alt=""> --}}
        {{$mahasiswaImage}}
    </div>
</body>

<script>
    const jsonData = JSON.parse(document.getElementById('my-script').dataset.json);
    console.log(jsonData);
</script>

</html>
