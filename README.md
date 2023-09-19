# "Mitä tänään tehtäisiin?"

#### Projektin "Mitä tänään tehtäisiin?" alustava kuvaus

Projektin tarkoitus on luoda sovellus, jonka avulla käyttäjä voisi löytää sääolosuhteisiin sopivaa tekemistä haluamalleen ajankohdalle.

Sovelluksen avulla käyttäjä voi selata tapahtumia sään, paikan ja ajankohdan perusteella. Käyttäjä voi myös luoda, muokata ja poistaa luomiaan tapahtumia.

Projektin toteutuksessa käytettävät toteutusteknologiat: 
-  Spring Boot
-  Java
-  JavaScript
-  H2-tietokanta alussa testidatan käsittelyyn, myöhemmässä vaiheessa toinen sopivaksi näkemämme tietokanta (MySQL / MariaDB).
-  Thymeleaf, myöhemmässä vaiheessa React.
-  Hyödynnämme avointa dataa muun muassa säätietojen, tapahtumien ja paikkojen hakemiseen. 

Ryhmän jäsenet:
- Lairi Piia
- Martinonyte Dovile
- Muittari Samuel
- Myllymäki Aliisa
- Rautiainen Aleksis
- Rusi Romeo

## Johdanto

Johdantoon kirjoitetaan lyhyt, ytimekäs kuvaus siitä, mikä on projektin aihe,
kuka on asiakas (käyttäjä), mitä hän haluaa ja saa järjestelmältä, mitä
tekniikoita käytetään ja mitä konkreettisesti on valmiina, kun projekti päättyy.

-   Järjestelmän tarkoitus ja tiivis kuvaus siitä, mistä on kyse ja kenelle järjestelmä on tarkoitettu.
-   Toteutus- ja toimintaympäristö lyhyesti:  
    -   Palvelinpuolen ratkaisut ja teknologiat (esim. palvelinteknologia, mikä tietokantajärjestelmä on käytössä)
    -   Käyttöliittymäratkaisut ja teknologiat (esim. päätelaitteet: puhelin,
    täppäri, desktop)

## Järjestelmän määrittely

Määrittelyssä järjestelmää tarkastellaan käyttäjän näkökulmasta. Järjestelmän
toiminnot hahmotellaan käyttötapausten tai käyttäjätarinoiden kautta, ja kuvataan järjestelmän
käyttäjäryhmät.

-   Lyhyt kuvaus käyttäjäryhmistä (rooleista)
-   Käyttäjäroolit ja roolien tarvitsemat toiminnot, esim. käyttötapauskaaviona
    (use case diagram) tai käyttäjätarinoina.
-   Lyhyt kuvaus käyttötapauksista tai käyttäjätarinat

Kuvauksissa kannattaa harkita, mikä on toteuttajalle ja asiakkaalle oleellista
tietoa ja keskittyä siihen.

## Käyttöliittymä

Esitetään käyttöliittymän tärkeimmät (vain ne!) näkymät sekä niiden väliset siirtymät käyttöliittymäkaaviona. 

Jos näkymän tarkoitus ei ole itsestään selvä, se pitää kuvata lyhyesti.

## Tietokanta

Järjestelmään säilöttävä ja siinä käsiteltävät tiedot ja niiden väliset suhteet
kuvataan käsitekaaviolla. Käsitemalliin sisältyy myös taulujen välisten viiteyhteyksien ja avainten
määritykset. Tietokanta kuvataan käyttäen jotain kuvausmenetelmää, joko ER-kaaviota ja UML-luokkakaaviota.

Lisäksi kukin järjestelmän tietoelementti ja sen attribuutit kuvataan
tietohakemistossa. Tietohakemisto tarkoittaa yksinkertaisesti vain jokaisen elementin (taulun) ja niiden
attribuuttien (kentät/sarakkeet) listausta ja lyhyttä kuvausta esim. tähän tyyliin:



### Tietokannan kaavio

![TietokantaV1](https://cdn.discordapp.com/attachments/1143485239105171548/1149753145711399114/relaatiokaavio_v1.png)


## Tietohakemisto

>### **Event**
> _Tapahtuma (Event) on tietty käyttäjän järjestämä tapaaminen tietyssä paikassa, tiettyyn aikaan. Tapahtuma voi olla maksullinen._
>Kenttä |Tyyppi |Pakollisuus|Kuvaus |
>---|---|---|---|
>eventId |Long PK |not null | Tapahtuman id |
>eventName |varchar(30)| not null | Tapahtuman nimi |
>date | date | not null | Tapahtuman päivämäärä |
>description | varchar(100) || Tapahtuman kuvaus |
>price | decimal || Hinta |
>category | varchar(20) FK||Tapahtuman kategoria, viittaus [_category_](#category)-tauluun|
>location | int FK||Tapahtumapaikka, viittaus [_location_](https://github.com/Ohjelmistoprojekti2-Black/mtt-backend/blob/develop/src/main/java/com/op2/op2/domain/Location.java)-tauluun|
>organizer | varchar(20) FK||Tapahtuman luoneen käyttäjän id, viittaus [_user_](#user)-tauluun|

---


## Tekninen kuvaus

Teknisessä kuvauksessa esitetään järjestelmän toteutuksen suunnittelussa tehdyt tekniset
ratkaisut, esim.

-   Missä mikäkin järjestelmän komponentti ajetaan (tietokone, palvelinohjelma)
    ja komponenttien väliset yhteydet (vaikkapa tähän tyyliin:
    https://security.ufl.edu/it-workers/risk-assessment/creating-an-information-systemdata-flow-diagram/)
-   Palvelintoteutuksen yleiskuvaus: teknologiat, deployment-ratkaisut yms.
-   Keskeisten rajapintojen kuvaukset, esimerkit REST-rajapinta. Tarvittaessa voidaan rajapinnan käyttöä täsmentää
    UML-sekvenssikaavioilla.
-   Toteutuksen yleisiä ratkaisuja, esim. turvallisuus.

Tämän lisäksi

-   ohjelmakoodin tulee olla kommentoitua
-   luokkien, metodien ja muuttujien tulee olla kuvaavasti nimettyjä ja noudattaa
    johdonmukaisia nimeämiskäytäntöjä
-   ohjelmiston pitää olla organisoitu komponentteihin niin, että turhalta toistolta
    vältytään

## Testaus

Tässä kohdin selvitetään, miten ohjelmiston oikea toiminta varmistetaan
testaamalla projektin aikana: millaisia testauksia tehdään ja missä vaiheessa.
Testauksen tarkemmat sisällöt ja testisuoritusten tulosten raportit kirjataan
erillisiin dokumentteihin.

Tänne kirjataan myös lopuksi järjestelmän tunnetut ongelmat, joita ei ole korjattu.

## Asennustiedot

Järjestelmän asennus on syytä dokumentoida kahdesta näkökulmasta:

-   järjestelmän kehitysympäristö: miten järjestelmän kehitysympäristön saisi
    rakennettua johonkin toiseen koneeseen

-   järjestelmän asentaminen tuotantoympäristöön: miten järjestelmän saisi
    asennettua johonkin uuteen ympäristöön.

Asennusohjeesta tulisi ainakin käydä ilmi, miten käytettävä tietokanta ja
käyttäjät tulee ohjelmistoa asentaessa määritellä (käytettävä tietokanta,
käyttäjätunnus, salasana, tietokannan luonti yms.).

## Käynnistys- ja käyttöohje

Tyypillisesti tässä riittää kertoa ohjelman käynnistykseen tarvittava URL sekä
mahdolliset kirjautumiseen tarvittavat tunnukset. Jos järjestelmän
käynnistämiseen tai käyttöön liittyy joitain muita toimenpiteitä tai toimintajärjestykseen liittyviä asioita, nekin kerrotaan tässä yhteydessä.

Usko tai älä, tulet tarvitsemaan tätä itsekin, kun tauon jälkeen palaat
järjestelmän pariin !

-----
[Dokumentin pohjan lähde](https://github.com/mruonavaara/projektikurssi)