<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nalog kreiran</title>
</head>
<body>
    <h2>Poštovana, {{$termin->klijent->user->name}}</h2>
    <p>Vaša rezervacija je potvrđena.</p>
    <p><strong>Datum i vreme:</strong> {{ $termin->vreme }}</p>
    <p><strong>Ukupna cena tretmana:</strong> {{ $termin->ukupnaCena }}</p>
    <p>Hvala Vam što birate naš salon.</p>
</body>
</html>
 