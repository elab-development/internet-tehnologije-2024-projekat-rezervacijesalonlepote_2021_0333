<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Potvrda rezervacije</title>
</head>
<body>
    <h1>Poštovani,</h1>
    <p>Vaša rezervacija je uspešno potvrđena za datum: {{ $reservation['vreme'] }}</p>
    <p>Ukupna cena rezervacije: {{ $reservation['ukupnaCena'] }} RSD.</p>
    <p>Hvala što ste koristili naše usluge!</p>
</body>
</html>