var rows=3,cols=6 // количество строк и столбцов, на кот разбивается изобр
var file="../images/fox.jpg"
var R=2 // коэфф масштабирования дял отобр отдельного фрагмента
var Cnv,outCnv // перем для записи ссылок на массив графич областей и на объект графич обл, в кот отобр увелич фрагмент
var Ctx,outCtx // перем для записи ссылок на массив объектов графич контекстов и на объект графич обл в кот отобр фрагмент исх изобр
var mytab // ccылка на табл с ячейками изобр
var myimg // ссылка на объект исходного изобр
window.onload=function(){ // загрузка
	myimg=new Image() // создание объекта изобр
	myimg.src=file // ссылка на файл с изобр
	mytab=document.getElementById("mytable") // ссылка на табл для размещ ячеек 
	outCnv=document.getElementById("output") // ссылка на графич обл исх изобр
	outCtx=outCnv.getContex("2d") // ссылка на объект графич контекста в обл для отобр исх изобр
	Cnv=new Array(rows) // создание массива для объектов графич областей
	Ctx=new Array(cols) // создание массива для объектов графчиеских контекстов графич областей
	for(var i=0;i<rows;i++){ // перебор строк в массивах
		mytab.insertRow(i) // добавление в таблицу строки
		Cnv[i]=new Array(cols) // Создание строки для массива объектов графич обл
		Ctx[i]=new Array(cols) // создание строки для массива объектов графич контекстов
		for(var j=0;j<cols;j++){ // перебор эл-тов в строке
			mytab.rows[i].insertCell(j) // добавление в строку таблицы новой ячейки
			Cnv[i][j]=document.createElement("canvas") // создание эл-та массива - объекта графич области
			Ctx[i][j]=Cnv[i][j].getContex("2d") // создание эл-та массива - объекта графич контекста
			mytab.rows[i].cells[j].appendChild(Cnv[i][j]) // добавление графич области в ячейку табл
			mytab.rows[i].cells[j].onmouseover=function(){ // обработчик события, связанного с наведением курсора мыши на обл ячейки таблицы
				var n,m
				m=this.parentElement.rowIndex // вычисление индекса строки, в кот находится ячейка
				n=this.cellIndex // вычисление индекса стобца, в кот находится ячейка
				Cnv[m][n].style.borderColor="#505050" // цвет рамки вокруг графич области, связанной c счейкой
				outCnv.style.borderColor="#505050" // цвеь рамки вокруг графич обл фрагмета
				outCtx.drawImage(Cnv[m][n],0,0,Cnv[m][n].width,Cnv[m][n].height,0,0,outCnv.width,outCnv.height) // отобр фрагмента исходника
			}
			mytab.rows[i].cells[j].onmouseout=function(){ // обработчик события, связанного с перемещением курсора за пределы
				var cnv // перем для записи ссылки на грфич облс внутри ячейки
				cnv=this.getElementByTagName("canvas")[0] // получение ссылки на графич область внутри ячейки
				cnv.style.borderColor="silver" // цвет рамки вокруг графич области внутри ячейки таблицы
				outCnv.style.borderColor="silver" // цвет рамки вокруг графич обл, в кот отображается фрагмент исходного изобр
				outCtx.clearRect(0,0,outCnv.width,outCnv.height) // очистка изобр
			}
		}		
	}		
	myimg.onload=function(){ // обработчик события, связанного с загрузкой исходника
		var width,height // ширина и высота изобр, внутри ячеек табл
		width=Math.floor(this,width/cols) // вычисление ширины изобр в ячейке
		height=Math.floor(this,width/rows)// вычисление высоты изобр в ячейке
		outCnv.height=Math.round(R*height) // высота графич обл для отдельного фрагмента
		outCnv.width=Math.round(R*width) // ширина графич обл для отдельного фрагмента
		for(var i=0;i<Cnv.length;i++){ // перебор строк в массиве грфич обл
			for(var j=0;j<Cnv[i].length;j++){ // перебор эл-тов в строке массива
				Cnv[i][j].width=width // ширина графич обл в ячейке
				Cnv[i][j].height=height // высота графич обл в ячейке
				Cnv[i][j].style.border="solid" // сплошная рамка
				Cnv[i][j].style.borderWidth="3px" // толщина рамки для обл
				Cnv[i][j].style.borderColor="silver" // Цвет рамки для обл
				Cnv[i][j].drawImage(this,j*width,i*height,width,height,0,0,width,height) // отобр фрагмента внутри ячейки
			}
		}
	}
}