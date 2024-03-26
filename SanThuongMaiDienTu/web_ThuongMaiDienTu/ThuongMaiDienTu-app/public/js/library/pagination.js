function loadNutPhanTrang(page,numpages,func_loadData)
{			
	if(typeof func_loadData ==="function")
	var LoadDatas = (page,numpages)=>{
		func_loadData(page,numpages)
	}		
	let s='';
	let pageAvaiable = [1,2,page-1, page, page+1, numpages-1,numpages] ;	
	if(page>1)
		s+=`<li class="page-item "><a onClick="LoadDatas(${page-1},${numpages})" class="page-link" >Trước</a></li>`;
	for(var i = 1;i<=numpages && numpages>1;i++)		
		if(pageAvaiable.indexOf(i)!=-1)																	
			s+=`<li class="page-item ${ i== page? 'active':''} " id="pape${i}"><a ${i!=page? `onClick="LoadDatas(${i},${numpages})`:''}" class="page-link">${i}</a></li>`;							
		else					   						  
		{
			if(i+2==page )								
				s+=`<li class="page-item" id="pape${i}"><a onClick="LoadDatas(${i},${numpages})" class="page-link">...</a></li>`;													
			else if(i-2==page && i != numpages)								
				s+=`<li class="page-item" id="pape${i}"><a onClick="LoadDatas(${i},${numpages})" class="page-link">...</a></li>`;	
		}														   
	if(numpages>1 && page <numpages)
		s+=`<li class="page-item"><a onClick="LoadDatas(${page+1},${numpages})" class="page-link" >Sau</a></li>`;
	$('#pagination').html(s);
	changeURLWithoutReloading(getCurrentURLPresentDeleteParams()+"?page="+page)
}
function changeURLWithoutReloading(newURL) {
    window.history.pushState(null, '', newURL);
}

var getCurrentURLPresentDeleteParams = (params_name)=>{
    var currentURL = window.location.href;
    var url = new URL(currentURL);
    url.searchParams.delete(params_name??"page");
    return url.toString();
}



function loadPaginationButtons(page,numpages,func_loadData)
{			
	$('#pagination').html("");
	var LoadDatas;
	if(typeof func_loadData ==="function")
		LoadDatas = (page,numpages)=>{
			func_loadData(page,numpages)
		}					
	var button;
	if(page>1)
	{
		button = $(`<li class="page-item"><a class="page-link" >Trước</a></li>`);
		button.click(function(){
			LoadDatas(page-1,numpages);
		})
		$('#pagination').append(button);
	}
	let pageAvaiable = [1,2,page-1, page, page+1, numpages-1,numpages];		
	for(let i = 1;i<=numpages && numpages>1;i++)		
	{
		button = null;;
		if(pageAvaiable.indexOf(i)!=-1)																	
			button=$(`<li class="page-item ${ i== page? 'active':''} " id="pape${i}"><a class="page-link">${i}</a></li>`);		
		else if(i+2==page || i-2==page)										
			button=$(`<li class="page-item" id="pape${i}"><a class="page-link">...</a></li>`);																									
		if(button)
		{
			if(i!=page)
			button.click(function(){
				LoadDatas(i,numpages);
			})
			$('#pagination').append(button);
		}		
	}												   
	if(numpages>1 && page <numpages)
	{
		button=$(`<li class="page-item"><a onClick="LoadDatas(${page+1},${numpages})" class="page-link" >Sau</a></li>`);
		button.click(function(){
			LoadDatas(page+1,numpages);
		})
		$('#pagination').append(button);
	}	
	changeURLWithoutReloading(getCurrentURLPresentDeleteParams()+"?page="+page)
}