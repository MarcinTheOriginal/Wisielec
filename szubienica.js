var haslo = "Bez pracy nie ma kołaczy";
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var fuckUps = 0;
var ukryteHaslo = "";

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

for (i=0; i<dlugosc; i++)
{
    /*używam charAt(i) ponieważ zaglądam w ciąg, a JS ma problem widocznie z określaniem kolejnych pozycji w ciągu, gdybym z tego stworzył tablicę jak niżej z literkami to mogłbym użyć [i], a więc haslo.charAt(i) potrafi patrzeć na każdy element tego stringa po kolei i w tej pętli bierze po kolei elementy i patrzy, jeżeli ten element jest równy spacji, to dodaje spacje do końca nowego stringu jakim jest wykreskowane hasło (oczywiście żadko hasło zacznie się od spacji więc od razu wskoczy w else, gdzie doda się -), potem bierze drugi znak i znów porównuje czy to spacja czy coś innego i dodaje na końcu do poprzednio wygenerowanego znaku nowy snak czy to literę czy to spację*/
    if (haslo.charAt(i) == " ") ukryteHaslo = ukryteHaslo + " "; 
    else ukryteHaslo = ukryteHaslo + "-"
    //W tym momencie mam oryginalny tekst, a wyświetlam "wypiszHaslo(); zakreskowany tekst
}

function wypiszHaslo()
{
    document.getElementById("plansza").innerHTML = ukryteHaslo;
}

window.onload = start;

var litery = new Array(35);
litery[0]="A"
litery[1]="Ą"
litery[2]="B"
litery[3]="C"
litery[4]="Ć"
litery[5]="D"
litery[6]="E"
litery[7]="Ę"
litery[8]="F"
litery[9]="G"
litery[10]="H"
litery[11]="I"
litery[12]="J"
litery[13]="K"
litery[14]="L"
litery[15]="Ł"
litery[16]="M"
litery[17]="N"
litery[18]="Ń"
litery[19]="O"
litery[20]="Ó"
litery[21]="P"
litery[22]="Q"
litery[23]="R"
litery[24]="S"
litery[25]="Ś"
litery[26]="T"
litery[27]="U"
litery[28]="V"
litery[29]="W"
litery[30]="X"
litery[31]="Y"
litery[32]="Z"
litery[33]="Ż"
litery[34]="Ź"

function start()//wypełnianie prawej części literkami alfabetu
{
    var trescDiva = "";

    for (i=0; i<35; i++)
    {
        var element = "lit"+i;
        /*Klasa litera napisana jest tylko w css, w HTML tworzy się gdy startuje funkcja start()*/
        trescDiva = trescDiva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>'//nic+pierwszy div+drugi div+trzeci div+itd. każdy z tych divów ma wygenerowane id "lit0/lit1/lit2/lit3" żeby potem można było się do nich odwołać, oraz generowana jest ich zawartość czyli litery z tablicy
        if((i + 1) % 7 == 0) trescDiva = trescDiva + '<div style="clear:both"></div>'
        //co 7 znak ma być nowa linia, za każdym stworzeniem diva pętla sprawdza czy konkretna iteracja i dzieli się bez 0 przez 7, jak nie to dodaje kolejnego diva, jak dzieli się bez reszty to dodaje diva, który generuje nową linię, a potem kontynuuje dodawanie divów
    }

    document.getElementById("alfabet").innerHTML = trescDiva;//tutaj wpisuje ten ciąg divów do diva alfabet

    wypiszHaslo();//wywołuję wypisanie ukrytego hałsa (zakreskowanego)
}

String.prototype.ustawZnak = function(miejsce, znak)
{
    if (miejsce > this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);//substr(numer znaku od którego wyjmuję łańcuch, ilość wyjmowanych znaków). Czyli od 0 miejsca do wskazanego przez i w funkcji sprawdz() wyciąga litery, potem wstawia literkę, a następnie bierze miejsce w którym przerwał, przenos się +1 bo w końcu ten jeden myślik zamieniłem na prawdziwą literkę i doklejam resztę niezmienioną.
}

/*Zostaje wywołana po wciśnięciu (onclick(i)), którejś z liter, zostaje też przysłany numer porządkowy tego przycisku*/
function sprawdz(nr)
{

    var trafiony = false;

    /*Pętla sprawdza każdy element po kolei z -> haslo = "Bez pracy nie ma kołaczy" 
    czyli na pozycji i=0 porównuje wartość, któa kryje się za "nr" przycisku, który został wciśnięty.
    Jeżeli zostanie wciśnięty przycisk od litery E czyli 6 to for będzie szukać dla kolejnych pozycji "i" i będzie porównywać, czy dla i=0 czyli B, litry[6] czyli E jest sobie równe? nie. Więc idzie dlaej i sprawdza dla i=1 czyli E czy litery[6] czyli E jest dla siebie równe? tak, ale pętla dalej się wykonuje, bo może później te litery będą się powtarzać, i tak do końca długości fora */
    for(i=0; i<dlugosc; i++)
    {
        if(haslo.charAt(i)==litery[nr])
        {
            ukryteHaslo = ukryteHaslo.ustawZnak(i,litery[nr]);
            trafiony = true;
        }
    }

    if(trafiony == true)
    {
        var element = "lit" + nr;//znajduję div, który został kliknięty
        document.getElementById(element).style.background = "green"
        document.getElementById(element).style.color = "#00c000"
        document.getElementById(element).style.border = "3px solid #00c000"
        document.getElementById(element).style.cursor = "default"
        yes.play();
        wypiszHaslo();
    }
    else
    {
        var element = "lit" + nr;//znajduję div, który został kliknięty
        document.getElementById(element).style.background = "red"
        document.getElementById(element).style.color = "#c00000"
        document.getElementById(element).style.border = "3px solid #c00000"
        document.getElementById(element).style.cursor = "default"
        document.getElementById(element).setAttribute("onclick",";")//dodanie onclick, który nic nie robi, bo od teraz ta literka ma onclick, który robi ";"...
        no.play();
        fuckUps++;
        document.getElementById("szubienica").innerHTML = '<img src="img/s'+fuckUps+'.jpg" alt="" />'
    }

    //wygrana
    if (haslo == ukryteHaslo)
    document.getElementById("alfabet").innerHTML = 'Odgadłeś hasło: <br/>"'+haslo+'"<br/><br/> <span class="reset" onclick="location.reload()" >Chcesz zagrać jeszcze raz?</span>'

    //przegrana
    if (fuckUps > 8)
    document.getElementById("alfabet").innerHTML = 'Zjebałeś, prawidłowe hasło to: <br/>"'+haslo+'"<br/><br/> <span class="reset" onclick="location.reload()" >Chcesz zagrać jeszcze raz?</span>'
}

function widerInput()
{
    var input = document.getElementById("enterPhrase");
    var dlugoscInputu = input.value.length;//ustalam ilość znaków tego pola
    
    if (dlugoscInputu>10) 
    {
        document.getElementById("enterPhrase").style.width = dlugoscInputu+1+'ch';
    }
    else document.getElementById("enterPhrase").style.width = "150px"
}

var noweHaslo = "";
//zrobić by po wciśnięciu buttona "wprowadź" przekazało wprowadzone hasło do "noweHasło"
//dodać przycisk, który zmienia text na password, żeby ukryć znaki wprowadzania
//dodać przycisk ztrzałkowy /\ i \/ żeby ukrywać i odkrywać pole do wprowadzania hasła