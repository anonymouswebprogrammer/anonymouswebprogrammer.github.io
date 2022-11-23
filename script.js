import moment from moment;

fillToDo();

function fillToDo() {
  {
    var data = [
      {
        eventName: "Hand in Assignment 1.2",
        eventTime: moment("2022-12-11"),
        eventDetails: "Due at 23:59",
        readings: "30 Pts",
        URL: "https://canvas.tue.nl/courses/22364/assignments/90824",
        icon: "description",
      },
      {
        eventName: "Hand in Assignment 2.1",
        eventTime: moment("2023-01-11"),
        eventDetails: "Due at 23:59",
        readings: "115 Pts",
        URL: "https://canvas.tue.nl/courses/22364/assignments/90825",
        icon: "description",
      },
      {
        eventName: "Video Pitch Assignment 2.2",
        eventTime: moment("2023-01-20"),
        eventDetails: "Due at 23:59",
        readings: "40 Pts",
        URL: "https://canvas.tue.nl/courses/22364/assignments/90826",
        icon: "description",
      },
      {
        eventName: "Hand in Assignment 1.1 - Example 1",
        eventTime: moment("2022-11-20"),
        eventDetails: "Due at 23:59",
        readings: "30 Pts",
        URL: "https://canvas.tue.nl/courses/22364/assignments/90821",
        icon: "description",
      },
      {
        eventName: "Hand in Assignment 1.1 - Example 2",
        eventTime: moment("2022-11-20"),
        eventDetails: "Due at 23:59",
        readings: "30 Pts",
        URL: "https://canvas.tue.nl/courses/22364/assignments/90821",
        icon: "description",
      },
      {
        eventName: "Hand in Assignment 1.1 - Example 3",
        eventTime: moment("2022-11-20"),
        eventDetails: "Due at 23:59",
        readings: "30 Pts",
        URL: "https://canvas.tue.nl/courses/22364/assignments/90821",
        icon: "description",
      },
      {
        eventName: "Final Exam",
        eventTime: moment("2023-02-01"),
        eventDetails: "09:00 - 13:00 (TBA)",
        readings: "60% of Final Grade",
        icon: "create",
        URL: "https://canvas.tue.nl/courses/22364/files/4300177?module_item_id=421825",
      },
      {
        eventName: "Resit Final Exam",
        eventTime: moment("2023-04-14"),
        eventDetails: "09:00 - 13:00 (TBA)",
        readings: "60% of Final Grade",
        icon: "create",
        URL: "https://canvas.tue.nl/courses/22364/files/4300177?module_item_id=421825",
      },
    ];
  }
  var today = moment();
  console.log(today);
  var todolist = document.getElementById("todolist");
  for (i = 0; i < data.length; ++i) {
    if (moment(data[i].eventTime) > today) {
      var todoItem = document.createElement("div");
      todoItem.className = "todoItem";
      todoItem.innerHTML =
        "<a href=" +
        data[i].URL +
        ' target="_blank"><div class="container"><div class="leftCol"><i class="material-icons icon">' +
        data[i].icon +
        '</i></div><div class="rightCol"><div class="todoName"><span class="bold">' +
        data[i].eventName +
        "</span><span> | " +
        moment(data[i].eventTime).format("DD MMM, YYYY") +
        '</span></div><div class="todoName"><span class>' +
        data[i].eventDetails +
        '</span><span class="italic"> ( ' +
        data[i].readings +
        " )</div></div></div></a>";
      todolist.appendChild(todoItem);
    }
  }
}

!(function () {
  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector(".today");
    if (current) {
      var self = this;
      window.setTimeout(function () {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function () {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();

    this.drawLegend();
  };

  Calendar.prototype.drawHeader = function () {
    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = createElement("div", "header");
      this.header.className = "header";

      this.title = createElement("h1");

      var right = createElement("div", "right");
      right.addEventListener("click", function () {
        self.nextMonth();
      });

      var left = createElement("div", "left");
      left.addEventListener("click", function () {
        self.prevMonth();
      });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format("MMMM YYYY");
  };

  Calendar.prototype.drawMonth = function () {
    var self = this;

    this.events.forEach(function (ev) {
      ev.date = moment(ev.eventTime, "YYYY-MM-DD");
    });

    if (this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = "month out " + (self.next ? "next" : "prev");
      this.oldMonth.addEventListener("webkitAnimationEnd", function () {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement("div", "month");
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function () {
          self.month.className = "month in " + (self.next ? "next" : "prev");
        }, 16);
      });
    } else {
      this.month = createElement("div", "month");
      this.el.appendChild(this.month);
      this.backFill();
      this.currentMonth();
      this.fowardFill();
      this.month.className = "month new";
    }
  };

  Calendar.prototype.backFill = function () {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if (!dayOfWeek) {
      return;
    }

    clone.subtract("days", dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this.drawDay(clone.add("days", 1));
    }
  };

  Calendar.prototype.fowardFill = function () {
    var clone = this.current.clone().add("months", 1).subtract("days", 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 6) {
      return;
    }

    for (var i = dayOfWeek; i < 6; i++) {
      this.drawDay(clone.add("days", 1));
    }
  };

  Calendar.prototype.currentMonth = function () {
    var clone = this.current.clone();

    while (clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add("days", 1);
    }
  };

  Calendar.prototype.getWeek = function (day) {
    if (!this.week || day.day() === 0) {
      this.week = createElement("div", "week");
      this.month.appendChild(this.week);
    }
  };

  Calendar.prototype.drawDay = function (day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement("div", this.getDayClass(day));
    outer.addEventListener("click", function () {
      self.openDay(this);
    });

    //Day Name
    var name = createElement("div", "day-name", day.format("ddd"));

    //Day Number
    var number = createElement("div", "day-number", day.format("DD"));

    //Events
    var events = createElement("div", "day-events");
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  };

  Calendar.prototype.drawEvents = function (day, element) {
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function (memo, ev) {
        if (ev.date.isSame(day, "day")) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function (ev) {
        var evSpan = createElement("span", ev.color);
        element.appendChild(evSpan);
      });
    }
  };

  Calendar.prototype.getDayClass = function (day) {
    classes = ["day"];
    if (day.month() !== this.current.month()) {
      classes.push("other");
    } else if (today.isSame(day, "day")) {
      classes.push("today");
    }
    return classes.join(" ");
  };

  Calendar.prototype.openDay = function (el) {
    var details, arrow;
    var dayNumber =
      +el.querySelectorAll(".day-number")[0].innerText ||
      +el.querySelectorAll(".day-number")[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector(".details");

    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector(".arrow");
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {
        currentOpened.addEventListener("webkitAnimationEnd", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("oanimationend", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("msAnimationEnd", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener("animationend", function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = "details out";
      }

      //Create the Details Container
      details = createElement("div", "details in");

      //Create the arrow
      var arrow = createElement("div", "arrow");

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.date.isSame(day, "day")) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + "px";
  };

  Calendar.prototype.renderEvents = function (events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector(".events");
    var wrapper = createElement(
      "div",
      "events in" + (currentWrapper ? " new" : "")
    );

    events.forEach(function (ev) {
      var div = createElement("div", "event");
      var square = createElement("div", "event-category " + ev.color);
      var span = createElement("span", "bold", ev.eventName);
      var icon = createElement("i", "material-icons", ev.attachment);
      icon.classList.add("attachment");
      var details = createElement(
        "div",
        "offset",
        ev.eventDetails + " | " + ev.readings
      );

      div.appendChild(square);
      div.appendChild(span);
      div.appendChild(icon);
      div.appendChild(details);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = createElement("div", "event empty");
      var span = createElement("span", "italic", "No events planned this day");

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if (currentWrapper) {
      currentWrapper.className = "events out";
      currentWrapper.addEventListener("webkitAnimationEnd", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("oanimationend", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("msAnimationEnd", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener("animationend", function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  };

  Calendar.prototype.drawLegend = function () {
    var legend = createElement("div", "legend");
    var calendars = this.events
      .map(function (e) {
        return e.calendar + "|" + e.color;
      })
      .reduce(function (memo, e) {
        if (memo.indexOf(e) === -1) {
          memo.push(e);
        }
        return memo;
      }, [])
      .forEach(function (e) {
        var parts = e.split("|");
        var entry = createElement("span", "entry " + parts[1], parts[0]);
        legend.appendChild(entry);
      });
    this.el.appendChild(legend);
  };

  Calendar.prototype.nextMonth = function () {
    this.current.add("months", 1);
    this.next = true;
    this.draw();
  };

  Calendar.prototype.prevMonth = function () {
    this.current.subtract("months", 1);
    this.next = false;
    this.draw();
  };

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if (className) {
      ele.className = className;
    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
})();

!(function () {
  var data = [
    {
      eventName: "Lecture: Introduction",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-11-15"),
      eventDetails: "10:45-12:30 (Lakens)",
      readings: "Readings: Chapter 1",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Design & Evaluation Methods",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-11-18"),
      eventDetails: "13:30-15:15 (Perugia)",
      readings: "Chapter 2 & 3 (up to 3.2.4)",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Cognition & Decision Making",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-11-22"),
      eventDetails: "10:45-12:30 (Lakens)",
      readings: "Chapter 6 & 7",
      attachment: "hearing",
    },
    {
      eventName: "Q&A Assignment 1",
      calendar: "Q&A",
      color: "yellow",
      eventTime: moment("2022-11-25"),
      eventDetails: "13:30-15:15 (Cristia)",
      readings: "",
      attachment: "description",
    },
    {
      eventName: "Lecture: Displays",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-11-29"),
      eventDetails: "10:45-12:30 (Lakens)",
      readings: "Chapter 8",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Affective Interaction",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-12-02"),
      eventDetails: "13:30-15:15 (Perugia)",
      readings: "Lottridge, 2011",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Control and Automation",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-12-06"),
      eventDetails: "10:45-12:30 (Lakens)",
      readings: "Chapter 9 & 11",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Human-Computer Interaction",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-12-09"),
      eventDetails: "13:30-15:15 (Perugia)",
      readings: "Chapter 10",
      attachment: "hearing",
    },
    {
      eventName: "Feedback Assignment 1 & Introduction Assignment 2",
      calendar: "Q&A",
      color: "yellow",
      eventTime: moment("2022-12-13"),
      eventDetails: "10:45-12:30 (Cristea)",
      readings: "",
      attachment: "description",
    },
    {
      eventName: "Lecture: Stress and Workload",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-12-16"),
      eventDetails: "13:30-15:15 (Lakens)",
      readings: "Chapter 15",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Safety, Accidents, and Errors",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2022-12-20"),
      eventDetails: "10:45-12:30 (Lakens)",
      readings: "Chapter 16",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Social Robotics & Ethics",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2023-01-10"),
      eventDetails: "10:45-12:30 (Perugia)",
      readings: "Readings: See Schedule",
      attachment: "hearing",
    },
    {
      eventName: "Lecture: Universal & Inclusive Design",
      calendar: "Lecture",
      color: "blue",
      eventTime: moment("2023-01-13"),
      eventDetails: "13:30-15:15 (Perugia)",
      readings: "Readings: See Schedule",
      attachment: "hearing",
    },
    {
      eventName: "Work on Video Pitch in Small Groups",
      calendar: "Group-Work",
      color: "green",
      eventTime: moment("2023-01-17"),
      eventDetails: "",
      readings: "",
      attachment: "mode_edit",
    },
    {
      eventName: "Deadline Video Pitch Business Proposals",
      calendar: "Deadlines",
      color: "orange",
      eventTime: moment("2023-01-23"),
      eventDetails: "",
      readings: "",
      attachment: "description",
    },
    {
      eventName: "Hand in Assignment 1.2",
      calendar: "Deadlines",
      color: "orange",
      eventTime: moment("2022-12-11"),
      eventDetails: "Due at 23:59",
      readings: "30 Pts",
      attachment: "description",
    },
    {
      eventName: "Hand in Assignment 2.1",
      calendar: "Deadlines",
      color: "orange",
      eventTime: moment("2023-01-11"),
      eventDetails: "Due at 23:59",
      readings: "115 Pts",
      attachment: "description",
    },
    {
      eventName: "Video Pitch Assignment 2.2",
      calendar: "Deadlines",
      color: "orange",
      eventTime: moment("2023-01-20"),
      eventDetails: "Due at 23:59",
      readings: "40 Pts",
      attachment: "description",
    },
    {
      eventName: "Hand in Assignment 1.1",
      calendar: "Deadlines",
      color: "orange",
      eventTime: moment("2022-11-20"),
      eventDetails: "Due at 23:59",
      readings: "30 Pts (each)",
      attachment: "description",
    },
    {
      eventName: "Final Exam",
      calendar: "Exams",
      color: "red",
      eventTime: moment("2023-02-01"),
      eventDetails: "",
      readings: "",
      attachment: "mode_edit",
    },
    {
      eventName: "Resit Final Exam",
      calendar: "Exams",
      color: "red",
      eventTime: moment("2023-04-14"),
      eventDetails: "",
      readings: "",
      attachment: "mode_edit",
    },
  ];

  function addDate(ev) {}

  var calendar = new Calendar("#calendar", data);
})();
