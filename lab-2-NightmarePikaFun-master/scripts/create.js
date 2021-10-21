document.addEventListener('DOMContentLoaded', function (){
  const taskbar = document.querySelector("div.task-bar")
  const $printer = document.querySelector('.print')
  let incrButton = document.querySelectorAll('.incr')
  let decrButton = document.querySelectorAll('.decr')
  const $newDay =document.querySelector('.day')

  var addValueToScore = {
    startScore:100,
    oldScore:100,
    score : 100,
    item: 0
  }

  var selectItems = document.querySelectorAll('div.task-bar__task')
  function select(){
    if(selectItems.length-1>-1)
    {
      selectItems[selectItems.length-1].addEventListener("click",function (){
        if(event.target.className == "task-bar__task" || event.target.className == "left-task-item" || event.target.className == "task-bar__task__text"
        || event.target.className == "task-bar__task__text task-bar__task__text__complete") {
          if(this.className == "task-bar__task selected")
          {
            this.classList.remove("selected");
          }
          else {
            this.classList.add("selected");
          }
        }
      })
    }
  }

  var deleteItems = document.querySelectorAll('.delete')

  function deleter() {
    if(deleteItems.length-1>-1) {
      deleteItems[deleteItems.length - 1].addEventListener("click", function () {
        downScore();
        console.log("removing!");
        this.parentNode.parentNode.parentNode.remove();
        end(0);
        changeGauge();
      })
    }
  }

  var inActiveItem = document.querySelectorAll('.complete')

  function asEmpty(){
    let empty = document.querySelector('div.task-bar');
    if(empty.parentNode.childNodes[9].classList.value == 'task-bar show')
    {
      empty.parentNode.childNodes[5].classList.remove('show');
      empty.parentNode.childNodes[7].classList.remove('show');
      empty.parentNode.childNodes[9].classList.remove('show');
      empty.parentNode.childNodes[11].classList.add('line__show')
      empty.parentNode.childNodes[11].classList.remove('line')
      empty.parentNode.firstElementChild.classList.add('container__all-done__show');
      empty.parentNode.firstElementChild.classList.remove('container__all-done');
      empty.parentNode.childNodes[3].classList.remove('container__start-day');
      empty.parentNode.childNodes[3].classList.add('container__start-day__show');
      empty.parentNode.classList.remove('container__with__image');
      empty.parentNode.classList.add('container');
    }
  }

  function asActive() {
    if(inActiveItem.length-1>-1)
    {
    inActiveItem[inActiveItem.length-1].addEventListener("click", function () {
        this.classList.remove('complete');
        this.classList.add('task-bar__task__checkbox-off__complete');
        let textNode = this.parentNode.parentNode.lastElementChild.firstElementChild;
        textNode.classList.add('task-bar__task__text__complete');
        console.log('complete');
        this.parentNode.parentNode.lastElementChild.lastElementChild.classList.remove('incr');
        incrButton = document.querySelectorAll('.incr')
        decrButton = document.querySelectorAll('.decr')
        end(0);
      })
    }
  }

  $newDay.addEventListener('click',function (){
    let tasks = document.querySelectorAll("div.task-bar__task")
    saveTask();
    let int = 0;
    let can = true;
    for(let i = 0; i <tasks.length;i++)
    {
      if(tasks[i].className == "task-bar__task") {
        can = false;
        downScore();
        tasks[i].remove();
      }
      else{
        tasks[i].classList.remove('selected');
      }
    }
    if(document.querySelector('div.task-bar').parentNode.childNodes[3].classList.value == "container__start-day__show" || can) {
      int = 1;
    }
    else
    {
      int = 0;
    }
    end(int);
    changeGauge();
  })

  $printer.addEventListener('click',function (){
    asEmpty();
    upScore();
    let divTest = document.createElement("div");
    let text = document.getElementsByClassName("text-input");
    divTest.className = "task-bar__task";
    divTest.innerHTML =
        "            <div class=\"task-bar__task__box\">\n" +
        "                <div class = \"task-bar__task__box_checkbox\">\n" +
        "                    <div class=\"task-bar__task__checkbox-off complete incr\">\n" +
        "                        <svg class = 'svg-ok' width=\"12\" height=\"10\" viewBox=\"0 0 12 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.91006 7.49585L1.7071 5.29291C1.31658 4.90239 0.683416 4.90239 0.292893 5.29291C-0.0976309 5.68343 -0.0976309 6.3166 0.292893 6.70712L3.29288 9.70709C3.7168 10.131 4.4159 10.0892 4.7863 9.61781L11.7863 1.61786C12.1275 1.18359 12.0521 0.554936 11.6178 0.213723C11.1835 -0.127489 10.5549 -0.0520504 10.2136 0.38222L3.91006 7.49585Z\"/>\n" +
        "                        </svg>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"left-task-item\">\n" +
        "                    <div class=\"task-bar__task__text\">"+text[0].value+"</div>\n" +
        "                    <div class=\"task-bar__task__box__remove delete\">\n" +
        "                        <div class=\"task-bar__task__remove\">\n" +
        "                            <svg class=\"x-close\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                                <path id=\"25\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.414 10L15.707 5.70701C16.098 5.31601 16.098 4.68401 15.707 4.29301C15.316 3.90201 14.684 3.90201 14.293 4.29301L10 8.58601L5.70701 4.29301C5.31601 3.90201 4.68401 3.90201 4.29301 4.29301C3.90201 4.68401 3.90201 5.31601 4.29301 5.70701L8.58601 10L4.29301 14.293C3.90201 14.684 3.90201 15.316 4.29301 15.707C4.48801 15.902 4.74401 16 5.00001 16C5.25601 16 5.51201 15.902 5.70701 15.707L10 11.414L14.293 15.707C14.488 15.902 14.744 16 15 16C15.256 16 15.512 15.902 15.707 15.707C16.098 15.316 16.098 14.684 15.707 14.293L11.414 10Z\" />\n" +
        "                            </svg>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n";
    text[0].value = "";
    taskbar.append(divTest);
    deleteItems = document.querySelectorAll('.delete')
    deleter();
    inActiveItem = document.querySelectorAll('.complete');
    asActive();
    incrButton = document.querySelectorAll('.incr');
    plus();
    decrButton = document.querySelectorAll('.decr');
    minus();
    taskCount();
    saveTask();
    selectItems = document.querySelectorAll('div.task-bar__task')
    select();
  })

  function allComplete(int){
    let divRemove = document.querySelector('div.task-bar');
    divRemove.parentNode.childNodes[5].classList.add('show');
    divRemove.parentNode.childNodes[7].classList.add('show');
    divRemove.parentNode.childNodes[9].classList.add('show');
    divRemove.parentNode.childNodes[11].classList.remove('line__show');
    divRemove.parentNode.childNodes[11].classList.add('line');
    divRemove.parentNode.classList.remove('container');
    divRemove.parentNode.classList.add('container__with-image');
    if(int == 0) {
      divRemove.parentNode.firstElementChild.classList.remove('container__all-done__show');
      divRemove.parentNode.firstElementChild.classList.add('container__all-done');
      divRemove.parentNode.childNodes[3].classList.remove('container__start-day');
      divRemove.parentNode.childNodes[3].classList.add('container__start-day__show');
    }
    else
    {
      divRemove.parentNode.childNodes[3].classList.remove('container__start-day__show');
      divRemove.parentNode.childNodes[3].classList.add('container__start-day');
      divRemove.parentNode.firstElementChild.classList.remove('container__all-done');
      divRemove.parentNode.firstElementChild.classList.add('container__all-done__show');
    }
  }

  const state = getStoredStateOrDefault({
    counter: 30
  })

  const $gauge = document.querySelector('.gauge')
  setGaugePercent($gauge, state.counter)

  function changeGauge()
  {
    state.counter = Math.min(completeTaskCount()*addValueToScore.score, 100)
    saveState(state)
    setGaugePercent($gauge, state.counter)
  }

  function plus() {
    if(incrButton.length-1>-1){
    incrButton[incrButton.length-1].addEventListener('click', function () {
        if (this.classList.contains('incr')) {
          state.counter = Math.min(completeTaskCount()*addValueToScore.score, 100)
          saveState(state)
          setGaugePercent($gauge, state.counter)
          this.classList.remove('incr');
        }
      })
    }
  }

  function minus() {
    if(decrButton.length-1>-1)
    {decrButton[decrButton.length-1].addEventListener('click', function () {
        if(!end(0)) {
          state.counter = Math.max((completeTaskCount()) * addValueToScore.score, 0);
        }
        else
        {
          changeGauge();
        }
        saveState(state)
        setGaugePercent($gauge, state.counter)
      })
    }
  }

  function  completeTaskCount(){
    return document.querySelectorAll('div.task-bar__task__text__complete').length;
  }

  function end(int){
    taskCount()
    let task = document.querySelectorAll('div.task-bar__task__text');
    let task2 = completeTaskCount();
    if(task.length==task2)
    {
      allComplete(int);
      return true;
    }
    else
    {
      return false;
    }
  }

  function upScore(){
    addValueToScore.item+=1;
    addValueToScore.oldScore = addValueToScore.score;
    addValueToScore.score = Math.trunc(addValueToScore.startScore/addValueToScore.item);
    changeGauge();
  }

  function downScore(){
    addValueToScore.item-=1;
    addValueToScore.oldScore = addValueToScore.score;
    addValueToScore.item=Math.max(addValueToScore.item,0);
    addValueToScore.score = Math.max(Math.trunc(addValueToScore.startScore/addValueToScore.item),0);
  }

  window.onload = function (){
    plus();
    deleter();
    asActive();
    minus();
    getTask();
    asEmpty();
    taskCount();
    changeGauge();
    end(1);
  }

  window.onbeforeunload = function (){
    saveTask();
  }

  function getTask(){
    let getText = localStorage.getItem('text');
    let getState = localStorage.getItem('state');
    var text = JSON.parse(getText).split('/');
    var state = JSON.parse(getState).split('/');
    for(let i = 0;i<state.length-1;i++)
    {
      if(state[i]==0)
      {

        createTaskNotMarked(text[i]);
      }
      else
      {
        createTaskMarked(text[i]);
      }
    }
  }

  function saveTask()
  {
    let taskBar = document.querySelector('div.task-bar').childNodes;
    let saveText = "";
    let saveState = "";
    for(let i = 1; i<taskBar.length;i++)
    {
      if(taskBar[i].className == 'task-bar__task' || taskBar[i].className == 'task-bar__task selected') {
        saveText += taskBar[i].lastElementChild.lastElementChild.firstElementChild.textContent;
        saveText += "/";
      }
      if(taskBar[i].lastElementChild.firstElementChild.firstElementChild.className == "task-bar__task__checkbox-off complete incr")
      {
        saveState+='0'
      }
      else
      {
        saveState+='1'
      }
      saveState+='/'
    }
    localStorage.setItem('text',JSON.stringify(saveText));
    localStorage.setItem('state',JSON.stringify(saveState));
  }

  function createTaskNotMarked(text)
  {
    upScore();
    let divTest = document.createElement("div");
    divTest.className = "task-bar__task";
    divTest.innerHTML =
        "            <div class=\"task-bar__task__box\">\n" +
        "                <div class = \"task-bar__task__box_checkbox\">\n" +
        "                    <div class=\"task-bar__task__checkbox-off complete incr\">\n" +
        "                        <svg class = 'svg-ok' width=\"12\" height=\"10\" viewBox=\"0 0 12 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.91006 7.49585L1.7071 5.29291C1.31658 4.90239 0.683416 4.90239 0.292893 5.29291C-0.0976309 5.68343 -0.0976309 6.3166 0.292893 6.70712L3.29288 9.70709C3.7168 10.131 4.4159 10.0892 4.7863 9.61781L11.7863 1.61786C12.1275 1.18359 12.0521 0.554936 11.6178 0.213723C11.1835 -0.127489 10.5549 -0.0520504 10.2136 0.38222L3.91006 7.49585Z\"/>\n" +
        "                        </svg>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"left-task-item\">\n" +
        "                    <div class=\"task-bar__task__text\">"+text+"</div>\n" +
        "                    <div class=\"task-bar__task__box__remove delete\">\n" +
        "                        <div class=\"task-bar__task__remove\">\n" +
        "                            <svg class=\"x-close\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                                <path id=\"25\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.414 10L15.707 5.70701C16.098 5.31601 16.098 4.68401 15.707 4.29301C15.316 3.90201 14.684 3.90201 14.293 4.29301L10 8.58601L5.70701 4.29301C5.31601 3.90201 4.68401 3.90201 4.29301 4.29301C3.90201 4.68401 3.90201 5.31601 4.29301 5.70701L8.58601 10L4.29301 14.293C3.90201 14.684 3.90201 15.316 4.29301 15.707C4.48801 15.902 4.74401 16 5.00001 16C5.25601 16 5.51201 15.902 5.70701 15.707L10 11.414L14.293 15.707C14.488 15.902 14.744 16 15 16C15.256 16 15.512 15.902 15.707 15.707C16.098 15.316 16.098 14.684 15.707 14.293L11.414 10Z\" />\n" +
        "                            </svg>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n";
    taskbar.append(divTest);
    deleteItems = document.querySelectorAll('.delete')
    deleter();
    inActiveItem = document.querySelectorAll('.complete');
    asActive();
    incrButton = document.querySelectorAll('.incr');
    plus();
    decrButton = document.querySelectorAll('.decr');
    minus();
    selectItems = document.querySelectorAll('div.task-bar__task')
    select();
  }

  function  createTaskMarked(text)
  {
    upScore();
    let divTest = document.createElement("div");
    divTest.className = "task-bar__task";
    divTest.innerHTML =
        "            <div class=\"task-bar__task__box\">\n" +
        "                <div class = \"task-bar__task__box_checkbox\">\n" +
        "                    <div class=\"task-bar__task__checkbox-off task-bar__task__checkbox-off__complete\">\n" +
        "                        <svg class = 'svg-ok' width=\"12\" height=\"10\" viewBox=\"0 0 12 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.91006 7.49585L1.7071 5.29291C1.31658 4.90239 0.683416 4.90239 0.292893 5.29291C-0.0976309 5.68343 -0.0976309 6.3166 0.292893 6.70712L3.29288 9.70709C3.7168 10.131 4.4159 10.0892 4.7863 9.61781L11.7863 1.61786C12.1275 1.18359 12.0521 0.554936 11.6178 0.213723C11.1835 -0.127489 10.5549 -0.0520504 10.2136 0.38222L3.91006 7.49585Z\"/>\n" +
        "                        </svg>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "                <div class=\"left-task-item\">\n" +
        "                    <div class=\"task-bar__task__text task-bar__task__text__complete\">"+text+"</div>\n" +
        "                    <div class=\"task-bar__task__box__remove delete\">\n" +
        "                        <div class=\"task-bar__task__remove\">\n" +
        "                            <svg class=\"x-close\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                                <path id=\"25\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.414 10L15.707 5.70701C16.098 5.31601 16.098 4.68401 15.707 4.29301C15.316 3.90201 14.684 3.90201 14.293 4.29301L10 8.58601L5.70701 4.29301C5.31601 3.90201 4.68401 3.90201 4.29301 4.29301C3.90201 4.68401 3.90201 5.31601 4.29301 5.70701L8.58601 10L4.29301 14.293C3.90201 14.684 3.90201 15.316 4.29301 15.707C4.48801 15.902 4.74401 16 5.00001 16C5.25601 16 5.51201 15.902 5.70701 15.707L10 11.414L14.293 15.707C14.488 15.902 14.744 16 15 16C15.256 16 15.512 15.902 15.707 15.707C16.098 15.316 16.098 14.684 15.707 14.293L11.414 10Z\" />\n" +
        "                            </svg>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>\n";
    taskbar.append(divTest);
    deleteItems = document.querySelectorAll('.delete')
    deleter();
    inActiveItem = document.querySelectorAll('.complete');
    asActive();
    incrButton = document.querySelectorAll('.incr');
    plus();
    decrButton = document.querySelectorAll('.decr');
    minus();
    selectItems = document.querySelectorAll('div.task-bar__task')
    select();
  }

  function taskCount()
  {
    let counter = document.querySelectorAll('div.task-bar__task').length;
    let counterText = document.querySelector("div.text-under-gauge");
    counterText.textContent = counter+" task";
  }
})