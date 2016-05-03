var cash = 0;
var speed = 10000;
var collectorBaseRate = 1;
var investorBaseRate = 0.01;
var collectorIncrease = 0;
var investorIncrease = 0;
var clickIncrease = 1;
var clickIncreasePrice = 100;
var clickCount = 0;
var collectorCount = 0;
var investorCount = 0;
var collectorPrice = 10;
var investorPrice = 200;
var collectorLevel = 0;
var collectorLevelUpPrice = 25;
var collectorSalary = 1;
var investorSalary = 5;
var totalCash = 0;
var loanCount = 0;
var dept = 0;
var baseInterest = 0.05;
var loanAmount = 500;


$(document).ready(function() {

  btn_cash = $("#btn_cash");
  btn_collector = $("#btn_collector");
  btn_collector_up = $("#btn_collector_up");
  btn_investor = $("#btn_investor");
  txt_cash = $("#txt_cash");
  txt_salary = $("#txt_salary");
  solhab = $("#solhab");
  txt_plusClick = $("#txt_plusClick");
  txt_plusCollector = $("#txt_plusCollector");
  txt_plusInvestor = $("#txt_plusInvestor");
  txt_minusCollector = $("#txt_minusCollector");
  txt_minusInvestor = $("#txt_minusInvestor");
  btn_stats = $("#btn_stats");
  btn_grabLoan = $("#btn_grabLoan");
  txt_totalCash = $("#txt_totalCash");
  btn_clickIncrease = $("#btn_clickIncrease");
  btn_help = $("#btn_help");
  txt_help = $("#txt_help");
  btn_impressum = $("#btn_impressum");
  txt_impressum = $("#txt_impressum");
  btn_achievement = $("#btn_achievement");
  txt_achievement = $("#txt_achievement");
  btn_officeIncrease = $("#btn_officeIncrease");

  collect();
  salary();

  btn_collector.hide();
  btn_collector_up.hide();
  btn_investor.hide();
  txt_cash.hide();
  txt_salary.hide();
  solhab.hide();
  txt_plusClick.hide();
  txt_plusCollector.hide();
  txt_plusInvestor.hide();
  txt_minusCollector.hide();
  txt_minusInvestor.hide();
  btn_stats.hide();
  txt_totalCash.hide();
  btn_clickIncrease.hide();
  txt_help.hide();
  txt_impressum.hide();
  btn_achievement.hide();
  txt_achievement.hide();
  btn_grabLoan.hide();
  btn_officeIncrease.hide();

  btn_cash.click(function() {
    cash = cash + clickIncrease;
    totalCash = totalCash + clickIncrease;
    clickCount++;
    btn_cash.text(cash.toFixed(2) + "");
    if (cash > 9 && collectorCount < 1) {
      btn_collector.show(500);
    }
  });

  btn_clickIncrease.click(function() {
    if (cash >= clickIncreasePrice) {
      cash = cash - clickIncreasePrice;
      clickIncrease = clickIncrease * 2;
      clickIncreasePrice = clickIncreasePrice * 2.25;
      btn_clickIncrease.hide(500);
      btn_clickIncrease.text("Buy energy drink for " + clickIncreasePrice.toFixed(2));
    }
  });

  btn_collector.click(function() {
    if (cash >= collectorPrice) {
      cash = cash - collectorPrice;
      collectorCount = collectorCount + 1;
      collectorPrice = collectorPrice * 1.1;
      collectorIncrease = collectorIncrease + collectorBaseRate;
      btn_collector.text("Buy Collector for " + collectorPrice.toFixed(2) + " [" + collectorCount + "]");
      btn_cash.text(cash.toFixed(2) + "");
      if (collectorCount > 0) {
        txt_cash.show(500);
        txt_salary.show(500);
        btn_stats.show(500);
        txt_plusClick.show(500);
        txt_plusCollector.show(500);
        txt_minusCollector.show(500);
        txt_totalCash.show(500);
      }
      if (collectorCount % 10 == 0 && collectorCount > 0) btn_clickIncrease.show(500);
    }
  });

  btn_collector_up.click(function() {
    if (cash >= collectorLevelUpPrice) {
      cash = cash - collectorLevelUpPrice;
      collectorLevel = collectorLevel + 1;
      collectorLevelUpPrice = collectorLevelUpPrice * 1.25;
      collectorBaseRate = collectorBaseRate * 1.12;
      collectorIncrease = collectorBaseRate * collectorCount;
      collectorSalary = collectorSalary * 1.05;
      btn_collector_up.text("Upgrade Collectors for " + collectorLevelUpPrice.toFixed(2) + " [" + collectorLevel + "]");
      btn_cash.text(cash.toFixed(2) + "");
    }
  });


  btn_investor.click(function() {
    if (cash >= investorPrice) {
      cash = cash - investorPrice;
      investorCount = investorCount + 1;
      investorPrice = investorPrice * 2.5;
      investorIncrease = 1 + (investorBaseRate * investorCount);
      btn_investor.text("Buy Investor for " + investorPrice.toFixed(2) + " [" + investorCount + "]");
      btn_cash.text(cash.toFixed(2) + "");
      if (investorCount > 0) {
        txt_plusInvestor.show(500);
        txt_minusInvestor.show(500);
      }
    }
  });

  btn_stats.click(function() {
    solhab.toggle(500);
  });

  btn_grabLoan.click(function() {
    loanCount = loanCount + 1;
    dept = dept + loanAmount;
    //loan todo
  });

  btn_help.click(function() {
    txt_help.toggle(500);
  });

  btn_impressum.click(function() {
    txt_impressum.toggle(500);
  });

  btn_achievement.click(function() {
    txt_achievement.toggle(500);
  });

  $("body").keypress(function() {
    cash = cash + clickIncrease;
    totalCash = totalCash + clickIncrease;
    clickCount++;
    btn_cash.text(cash.toFixed(2) + "");
    if (cash > 9 && collectorCount < 1) {
      btn_collector.show(500);
    }
  });

  // Tooltip only Text
  $('.masterTooltip').hover(function() {
    // Hover over code
    var title = $(this).attr('title');
    $(this).data('tipText', title).removeAttr('title');
    $('<p class="tooltip"></p>')
      .text(title)
      .appendTo('body')
      .fadeIn('slow');
  }, function() {
    // Hover out code
    $(this).attr('title', $(this).data('tipText'));
    $('.tooltip').remove();
  }).mousemove(function(e) {
    var mousex = e.pageX + 20; //Get X coordinates
    var mousey = e.pageY + 10; //Get Y coordinates
    $('.tooltip')
      .css({
        top: mousey,
        left: mousex
      })
  });

  $("h4").click(function() {
    if ($("h4").text() == "Leeman Bothers Finance Institute Simulator") {
      $("h4").text(cash.toFixed(2));
      $(".frame").toggle(1000);
    } else {
      $("h4").text("Leeman Bothers Finance Institute Simulator")
      $(".frame").toggle(1000);
    }
  });
});

function collect() {
  if (collectorCount > 0) {
    cash = cash + (collectorIncrease / 10);
    totalCash = totalCash + (collectorIncrease / 10);
  }

  if (investorCount > 0) {
    cash = cash * (((investorIncrease - 1) / 10) + 1);
    totalCash = totalCash + (cash * ((investorIncrease - 1) / 10));
  }
  if (collectorCount > 0) btn_collector_up.show(500);
  if (cash > 199) btn_investor.show(500);
  btn_cash.text(cash.toFixed(2) + "");
  updateStats();
  checkAchievements();

  if ($("h4").text() != "Leeman Bothers Finance Institute Simulator") {
    $("h4").text(cash.toFixed(2));
  }


  t = setTimeout(function() {
    collect()
  }, (speed / 10));
}

function salary() {
  if (cash <= ((collectorCount * collectorSalary) + (investorCount * investorSalary))) {
    t = setTimeout(function() {
      salary()
    }, (10));
  } else {
    if (collectorCount > 0) {
      cash = cash - (collectorCount * collectorSalary);
    }
    if (investorCount > 0) {
      cash = cash - (investorCount * investorSalary);
    }
    if (loanCount > 0) {
      //loan todo
    }
    t = setTimeout(function() {
      salary()
    }, (speed));
  }
}

function updateStats() {
  if (investorCount == 0) txt_cash.text("Gainings: " + (collectorIncrease / 10).toFixed(2) + " cash/s.");
  if (investorCount > 0) txt_cash.text("Gainings: " + ((collectorIncrease / 10) + (cash * ((investorIncrease - 1) / 10))).toFixed(2) + " cash/s.");
  txt_salary.text("Salaries: -" + (((collectorCount * collectorSalary) + (investorCount * investorSalary)) / 10).toFixed(2) + " cash/s.");
  txt_plusClick.text("+: Click:      " + clickIncrease.toFixed(2) + " cash/click");
  txt_plusCollector.text("+: Collector:  " + (collectorIncrease).toFixed(2) + " cash/10s");
  txt_plusInvestor.text("+: Investor:   " + ((investorIncrease - 1) * 100).toFixed(2) + " %/10s");
  txt_minusCollector.text("-: Collector: -" + (collectorCount * collectorSalary).toFixed(2) + " cash/10s");
  txt_minusInvestor.text("-: Investor:  -" + (investorCount * investorSalary).toFixed(2) + " cash/10s");
  txt_totalCash.text("Total Cash: " + totalCash.toFixed(2) + " cash");
  //loan todo
}

function checkAchievements() {
  btn_achievement.text("Achievements [" + achievementCount + "/" + achievements.length + "]");
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i][0] == 0) {
      if (achievements[i][1]()) {
        btn_achievement.show(500);
        achievements[i][0] = 1;
        achievementCount++;
        txt_achievement.append($("<div class=\"frame masterTooltip\" title=\"" + achievements[i][3] + "\"/>").text(achievements[i][2]));
      }
    }
  }
}

var achievementCount = 0;
var achievements = [
  //[0,function(){ return "___your_expressions___" },"Text","title"],
  [0, function() {
    return collectorCount > 0
  }, "Get the moneys flowing.", "You bought your first collector."],
  [0, function() {
    return investorCount > 0
  }, "Damn percentages.", "You bought your first investor."],
  [0, function() {
    return totalCash > 1000000
  }, "Millionair.", "Well, at least on the paper."],
  [0, function() {
    return collectorCount > 49
  }, "That's the business.", "Hire 50 Collectors."],
  [0, function() {
    return clickCount > 99
  }, "Impressive Clicker!", "+1, +1, +1, +1 ..."],
  [0, function() {
    return clickCount > 999
  }, "Clickeroo!", "1000 clicks, and its still rising."],
  [0, function() {
    return clickCount > 9999
  }, "Broken Mouse Convention!", "You should consult a doctor."],
  [0, function() {
    return clickIncreasePrice > 5000
  }, "Coffein-Junkie.", "You should slow down your energy drink consumption."],
  [0, function() {
    return achievementCount == 10
  }, "10 Achievements. Here's one more.", "10 Achievements is worth a notice."],
  [0, function() {
    return (collectorCount + investorCount) > 99
  }, "Hundrets of people.", "And they are all under your command."],
  [0, function() {
    return cash < 0
  }, "Negativ, Sir.", "You got your moneys into the negatives. Congratz."],
  [0, function() {
    return collectorLevel > 9
  }, "Raise dem IQ", "Send your workers to school 10 times."],
  [0, function() {
    return collectorLevel > 99
  }, "Clever Workers", "100 of upgrades for your collectors."],
  [0, function() {
    return (cash > 99 && cash == totalCash)
  }, "Clicker Nerd", "Getting money before buying anything?"],
  //[0,function(){ return "___your_expressions___" },"Text","title"],
  //[0,function(){ return "___your_expressions___" },"Text","title"],
  //[0,function(){ return "___your_expressions___" },"Text","title"],
  //[0,function(){ return "___your_expressions___" },"Text","title"],
];
