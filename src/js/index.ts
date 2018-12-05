import {ILock} from "./ILock"
import axios, {
    AxiosResponse, 
    AxiosError} from "../../node_modules/axios/index";

const uri : string = "https://shabzsmartlock.azurewebsites.net/api/lock/";

let showAllLocksElement : HTMLDivElement = <HTMLDivElement>document.getElementById("allLocksDiv");
let addLocksElement : HTMLDivElement = <HTMLDivElement>document.getElementById("addLockDiv");
let updateLocksElement : HTMLDivElement = <HTMLDivElement>document.getElementById("updateLockDiv");
let showAllLockButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("allLocksBtn");
let createLockButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("addLockBtn");
let updateLockButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("updateLockBtn")


createLockButton.addEventListener("click", addNewLock);
showAllLockButton.addEventListener("click", showAllLocks);
updateLockButton.addEventListener("click", updateLock);

function showAllLocks() : void{
    axios.get<ILock[]>(uri)
    .then(function (response : AxiosResponse<ILock[]>): void{
        let result : string = "<br>"
        response.data.forEach((lock : ILock)=>{
            if (lock == null)
            {
                result += "<li>Null element</li>"
             }
            else 
            {
                result += "<li>" + "<br>" + "<b> Id: </b>" + lock.id.toString() + "<br>" + "<b> navn: </b>" + lock.name + "<br>" + "<b>Accescode: </b>" + lock.accessCode + "<br>" + "<b>Dato: </b>" + lock.date + "<br>"  + "<b>Status: </b>" + lock.status + "</li>" + "<br>"; 
            }
        }) 

        showAllLocksElement.innerHTML = result;     
    })
    .catch(function( error : AxiosError): void{
        showAllLocksElement.innerHTML = error.message;
    })
}

function addNewLock() : void{
    
    let newName : string = (document.getElementById("name")as HTMLInputElement).value;
    let newAccessCode : string = (document.getElementById("accessCode")as HTMLInputElement).value;
    let newDate : string = (document.getElementById("lockDate")as HTMLInputElement).value;
    let newStatus : boolean = (document.getElementById("lockStatus")as HTMLInputElement).checked;

    axios.post<ILock>(uri, {name : newName, accessCode : newAccessCode,  date: newDate, status : newStatus})
    .then((response:AxiosResponse) =>{console.log("Response: " + response.status + " " + response.statusText)})
    .catch(function( error : AxiosError): void{
        addLocksElement.innerHTML = error.message;
    })    
    showAllLocks();
}

function updateLock() : void{
    let updateId : number = +(document.getElementById("updateId")as HTMLInputElement).value;
    let updateName : string = (document.getElementById("updateName")as HTMLInputElement).value;
    let updateAccessCode : string = (document.getElementById("updateAccesCode")as HTMLInputElement).value;
    let updateDate : string = (document.getElementById("updateDate")as HTMLInputElement).value;
    let updateStatus : boolean = (document.getElementById("updateStatus")as HTMLInputElement).checked;
    
    let data = {id : updateId, name : updateName, accessCode : updateAccessCode, date : updateDate, status : updateStatus};
    let uriUpdate : string = uri + updateId;
    axios.put<ILock>(uriUpdate, data)
    .then((response:AxiosResponse) =>{console.log("Response: " + response.status + " " + response.statusText)})
    .catch(function( error : AxiosError): void{
        updateLocksElement.innerHTML = error.message;
    })   
    showAllLocks();
};

