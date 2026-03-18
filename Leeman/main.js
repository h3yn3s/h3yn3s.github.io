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
var officeSpace = 3;
var officeLevel = 1;
var officePrice = 1000;
var prestigeLevel = 0;
var prestigeMultiplier = 1;
var longtimeUnlocked = 0;
var longtimeUnlockPrice = 5000;
var longtimeInvested = 0;
var longtimeTicks = 5;
var longtimeTicksRemaining = 0;
var longtimeLevel = 0;
var longtimeAmount = 10;
var longtimeReturn = 1.1;
var longtimeUpgradePrice = 500;

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
  btn_repayLoan = $("#btn_repayLoan");
  txt_totalCash = $("#txt_totalCash");
  btn_clickIncrease = $("#btn_clickIncrease");
  btn_help = $("#btn_help");
  txt_help = $("#txt_help");
  btn_achievement = $("#btn_achievement");
  txt_achievement = $("#txt_achievement");
  btn_officeIncrease = $("#btn_officeIncrease");
  txt_officeSpace = $("#txt_officeSpace");
  txt_dept = $("#txt_dept");
  btn_save = $("#btn_save");
  btn_reset = $("#btn_reset");
  btn_bankruptcy = $("#btn_bankruptcy");
  txt_prestige = $("#txt_prestige");
  btn_longtimeUnlock = $("#btn_longtimeUnlock");
  btn_longtimeInvest = $("#btn_longtimeInvest");
  btn_longtimeUpgrade = $("#btn_longtimeUpgrade");
  txt_longtimeStatus = $("#txt_longtimeStatus");

  loadGame();

  // Hide everything first
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
  btn_achievement.hide();
  txt_achievement.hide();
  btn_grabLoan.hide();
  btn_repayLoan.hide();
  btn_officeIncrease.hide();
  btn_bankruptcy.hide();
  btn_longtimeUnlock.hide();
  btn_longtimeInvest.hide();
  btn_longtimeUpgrade.hide();
  txt_longtimeStatus.hide();

  // Then restore UI from loaded state
  refreshUI();

  collect();
  salary();

  // Auto-save every 30s and on close
  setInterval(saveGame, 30000);
  $(window).on("beforeunload", saveGame);

  btn_cash.click(function() {
    cash = cash + (clickIncrease * prestigeMultiplier);
    totalCash = totalCash + (clickIncrease * prestigeMultiplier);
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
    if ((collectorCount + investorCount) >= officeSpace) {
      return;
    }
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
    if ((collectorCount + investorCount) >= officeSpace) {
      return;
    }
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

  btn_officeIncrease.click(function() {
    if (cash >= officePrice) {
      cash = cash - officePrice;
      officeLevel++;
      officeSpace += 2 + officeLevel;
      officePrice *= 2.5;
      btn_officeIncrease.text("Increase your office for " + officePrice.toFixed(2));
      btn_cash.text(cash.toFixed(2) + "");
    }
  });

  btn_stats.click(function() {
    solhab.toggle(500);
  });

  btn_grabLoan.click(function() {
    loanCount = loanCount + 1;
    dept = dept + loanAmount;
    cash = cash + loanAmount;
    btn_grabLoan.text("Grab Loan (500 cash; 5%/10s interests) [" + loanCount + "]");
    btn_cash.text(cash.toFixed(2) + "");
    btn_repayLoan.show(500);
  });

  btn_repayLoan.click(function() {
    var payment = Math.min(cash, dept);
    cash = cash - payment;
    dept = dept - payment;
    btn_cash.text(cash.toFixed(2) + "");
    if (dept <= 0) {
      dept = 0;
      btn_repayLoan.hide(500);
    }
  });

  btn_save.click(function() {
    saveGame();
  });

  btn_reset.click(function() {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone!")) {
      localStorage.removeItem("leemanSave");
      location.reload();
    }
  });

  btn_bankruptcy.click(function() {
    if (confirm("Declare bankruptcy? All progress will be reset, but you gain a permanent cash multiplier!")) {
      prestigeLevel++;
      prestigeMultiplier = 1 + (prestigeLevel * 0.5 * Math.log10(totalCash));
      // Reset all progress except prestige vars
      cash = 0;
      collectorBaseRate = 1;
      investorBaseRate = 0.01;
      collectorIncrease = 0;
      investorIncrease = 0;
      clickIncrease = 1;
      clickIncreasePrice = 100;
      clickCount = 0;
      collectorCount = 0;
      investorCount = 0;
      collectorPrice = 10;
      investorPrice = 200;
      collectorLevel = 0;
      collectorLevelUpPrice = 25;
      collectorSalary = 1;
      investorSalary = 5;
      totalCash = 0;
      loanCount = 0;
      dept = 0;
      officeSpace = 3;
      officeLevel = 1;
      officePrice = 1000;
      longtimeUnlocked = 0;
      longtimeInvested = 0;
      longtimeTicks = 5;
      longtimeTicksRemaining = 0;
      longtimeLevel = 0;
      longtimeAmount = 10;
      longtimeReturn = 1.1;
      longtimeUpgradePrice = 500;
      achievementCount = 0;
      for (var i = 0; i < achievements.length; i++) {
        achievements[i][0] = 0;
      }
      saveGame();
      location.reload();
    }
  });

  btn_longtimeUnlock.click(function() {
    if (cash >= longtimeUnlockPrice) {
      cash = cash - longtimeUnlockPrice;
      longtimeUnlocked = 1;
      btn_longtimeUnlock.hide(500);
      btn_longtimeInvest.show(500);
      btn_longtimeUpgrade.show(500);
      updateLongtimeButtons();
      btn_cash.text(cash.toFixed(2) + "");
    }
  });

  btn_longtimeInvest.click(function() {
    if (longtimeTicksRemaining > 0) return;
    if (cash < longtimeAmount) return;
    cash = cash - longtimeAmount;
    longtimeInvested = longtimeAmount;
    longtimeTicksRemaining = longtimeTicks;
    btn_longtimeInvest.text("Longtime Investment: maturing...");
    btn_longtimeUpgrade.hide(500);
    txt_longtimeStatus.show();
    btn_cash.text(cash.toFixed(2) + "");
  });

  btn_longtimeUpgrade.click(function() {
    if (longtimeTicksRemaining > 0) return;
    if (cash >= longtimeUpgradePrice) {
      cash = cash - longtimeUpgradePrice;
      longtimeLevel++;
      longtimeAmount += 10;
      longtimeReturn += 0.1;
      longtimeUpgradePrice = Math.floor(longtimeUpgradePrice * 2.2);
      updateLongtimeButtons();
      btn_cash.text(cash.toFixed(2) + "");
    }
  });

  btn_help.click(function() {
    txt_help.toggle(500);
  });

  btn_achievement.click(function() {
    txt_achievement.toggle(500);
  });

  // Tooltip only Text
  $(document).on('mouseenter', '.masterTooltip', function() {
    var title = $(this).attr('title');
    $(this).data('tipText', title).removeAttr('title');
    $('<p class="tooltip"></p>')
      .text(title)
      .appendTo('body')
      .fadeIn('slow');
  }).on('mouseleave', '.masterTooltip', function() {
    $(this).attr('title', $(this).data('tipText'));
    $('.tooltip').remove();
  }).on('mousemove', '.masterTooltip', function(e) {
    var mousex = e.pageX + 20;
    var mousey = e.pageY + 10;
    $('.tooltip')
      .css({
        top: mousey + 'px',
        left: mousex + 'px'
      })
  });

  $("h4").click(function() {
    if ($("h4").text() == "Stonks Inc.") {
      $("h4").text(cash.toFixed(2));
      $(".frame").toggle(1000);
    } else {
      $("h4").text("Stonks Inc.")
      $(".frame").toggle(1000);
    }
  });
});

function collect() {
  if (collectorCount > 0) {
    var collectorGain = (collectorIncrease / 10) * prestigeMultiplier;
    cash = cash + collectorGain;
    totalCash = totalCash + collectorGain;
  }

  if (investorCount > 0) {
    cash = cash * (((investorIncrease - 1) / 10) + 1);
    totalCash = totalCash + (cash * ((investorIncrease - 1) / 10));
  }
  if (collectorCount > 0) btn_collector_up.show(500);
  if (cash > 199) btn_investor.show(500);
  if (collectorCount > 4) btn_grabLoan.show(500);
  if (dept > 0) btn_repayLoan.show(500);
  if (totalCash > 1000000) btn_bankruptcy.show(500);
  if (investorCount > 0 && longtimeUnlocked == 0) btn_longtimeUnlock.show(500);
  if (longtimeUnlocked == 1 && longtimeTicksRemaining <= 0) btn_longtimeInvest.show(500);

  // Show office increase button when at capacity
  if ((collectorCount + investorCount) >= officeSpace) {
    btn_officeIncrease.show(500);
  }

  btn_cash.text(cash.toFixed(2) + "");
  updateStats();
  checkAchievements();

  if ($("h4").text() != "Stonks Inc.") {
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
      dept += dept * baseInterest;
      // Debt consequence: if dept > 5000, salaries creep up
      if (dept > 5000) {
        collectorSalary *= 1.001;
        investorSalary *= 1.001;
      }
    }
    if (longtimeTicksRemaining > 0) {
      longtimeTicksRemaining--;
      if (longtimeTicksRemaining <= 0) {
        var payout = longtimeInvested * longtimeReturn;
        cash = cash + payout;
        totalCash = totalCash + (payout - longtimeInvested);
        longtimeInvested = 0;
        updateLongtimeButtons();
        btn_longtimeUpgrade.show();
        txt_longtimeStatus.hide();
      }
    }
    t = setTimeout(function() {
      salary()
    }, (speed));
  }
}

function updateStats() {
  var collectorGainPerTick = (collectorIncrease / 10) * prestigeMultiplier;
  if (investorCount == 0) txt_cash.text("Gainings: " + collectorGainPerTick.toFixed(2) + " cash/s.");
  if (investorCount > 0) txt_cash.text("Gainings: " + (collectorGainPerTick + (cash * ((investorIncrease - 1) / 10))).toFixed(2) + " cash/s.");
  txt_salary.text("Salaries: -" + (((collectorCount * collectorSalary) + (investorCount * investorSalary)) / 10).toFixed(2) + " cash/s.");
  txt_plusClick.text("+: Click:      " + (clickIncrease * prestigeMultiplier).toFixed(2) + " cash/click");
  txt_plusCollector.text("+: Collector:  " + (collectorIncrease * prestigeMultiplier).toFixed(2) + " cash/10s");
  txt_plusInvestor.text("+: Investor:   " + ((investorIncrease - 1) * 100).toFixed(2) + " %/10s");
  txt_minusCollector.text("-: Collector: -" + (collectorCount * collectorSalary).toFixed(2) + " cash/10s");
  txt_minusInvestor.text("-: Investor:  -" + (investorCount * investorSalary).toFixed(2) + " cash/10s");
  txt_totalCash.text("Total Cash: " + totalCash.toFixed(2) + " cash");
  txt_officeSpace.text("Office Space: " + (collectorCount + investorCount) + "/" + officeSpace);
  txt_dept.text("Debt: " + dept.toFixed(2) + " cash");
  if (prestigeLevel > 0) {
    txt_prestige.text("Prestige Level: " + prestigeLevel + " | Multiplier: " + prestigeMultiplier.toFixed(2) + "x");
  }
  if (longtimeTicksRemaining > 0) {
    var expectedPayout = longtimeInvested * longtimeReturn;
    txt_longtimeStatus.text("Investment: " + longtimeInvested.toFixed(2) + " maturing in " + longtimeTicksRemaining + " ticks → " + expectedPayout.toFixed(2) + " cash");
  }
}

function checkAchievements() {
  btn_achievement.text("Achievements [" + achievementCount + "/" + achievements.length + "]");
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i][0] == 0) {
      if (achievements[i][1]()) {
        btn_achievement.show(500);
        achievements[i][0] = 1;
        achievementCount++;
        txt_achievement.append($("<div class=\"frame p-[5px] m-2 border-2 border-solid border-white rounded-none text-[14pt] text-left masterTooltip\" title=\"" + achievements[i][3] + "\"/>").text(achievements[i][2]));
      }
    }
  }
}

function saveGame() {
  var saveData = {
    cash: cash,
    collectorBaseRate: collectorBaseRate,
    investorBaseRate: investorBaseRate,
    collectorIncrease: collectorIncrease,
    investorIncrease: investorIncrease,
    clickIncrease: clickIncrease,
    clickIncreasePrice: clickIncreasePrice,
    clickCount: clickCount,
    collectorCount: collectorCount,
    investorCount: investorCount,
    collectorPrice: collectorPrice,
    investorPrice: investorPrice,
    collectorLevel: collectorLevel,
    collectorLevelUpPrice: collectorLevelUpPrice,
    collectorSalary: collectorSalary,
    investorSalary: investorSalary,
    totalCash: totalCash,
    loanCount: loanCount,
    dept: dept,
    officeSpace: officeSpace,
    officeLevel: officeLevel,
    officePrice: officePrice,
    prestigeLevel: prestigeLevel,
    prestigeMultiplier: prestigeMultiplier,
    longtimeUnlocked: longtimeUnlocked,
    longtimeInvested: longtimeInvested,
    longtimeTicks: longtimeTicks,
    longtimeTicksRemaining: longtimeTicksRemaining,
    longtimeLevel: longtimeLevel,
    longtimeAmount: longtimeAmount,
    longtimeReturn: longtimeReturn,
    longtimeUpgradePrice: longtimeUpgradePrice,
    achievementFlags: achievements.map(function(a) { return a[0]; })
  };
  localStorage.setItem("leemanSave", JSON.stringify(saveData));
}

function loadGame() {
  var raw = localStorage.getItem("leemanSave");
  if (!raw) return;
  try {
    var s = JSON.parse(raw);
    cash = s.cash || 0;
    collectorBaseRate = s.collectorBaseRate || 1;
    investorBaseRate = s.investorBaseRate || 0.01;
    collectorIncrease = s.collectorIncrease || 0;
    investorIncrease = s.investorIncrease || 0;
    clickIncrease = s.clickIncrease || 1;
    clickIncreasePrice = s.clickIncreasePrice || 100;
    clickCount = s.clickCount || 0;
    collectorCount = s.collectorCount || 0;
    investorCount = s.investorCount || 0;
    collectorPrice = s.collectorPrice || 10;
    investorPrice = s.investorPrice || 200;
    collectorLevel = s.collectorLevel || 0;
    collectorLevelUpPrice = s.collectorLevelUpPrice || 25;
    collectorSalary = s.collectorSalary || 1;
    investorSalary = s.investorSalary || 5;
    totalCash = s.totalCash || 0;
    loanCount = s.loanCount || 0;
    dept = s.dept || 0;
    officeSpace = s.officeSpace || 3;
    officeLevel = s.officeLevel || 1;
    officePrice = s.officePrice || 1000;
    prestigeLevel = s.prestigeLevel || 0;
    prestigeMultiplier = s.prestigeMultiplier || 1;
    longtimeUnlocked = s.longtimeUnlocked || 0;
    longtimeInvested = s.longtimeInvested || 0;
    longtimeTicks = s.longtimeTicks || 5;
    longtimeTicksRemaining = s.longtimeTicksRemaining || 0;
    longtimeLevel = s.longtimeLevel || 0;
    longtimeAmount = s.longtimeAmount || 10;
    longtimeReturn = s.longtimeReturn || 1.1;
    longtimeUpgradePrice = s.longtimeUpgradePrice || 500;
    if (s.achievementFlags) {
      for (var i = 0; i < s.achievementFlags.length && i < achievements.length; i++) {
        achievements[i][0] = s.achievementFlags[i];
      }
    }
    // Recount achievements
    achievementCount = 0;
    for (var i = 0; i < achievements.length; i++) {
      if (achievements[i][0] == 1) achievementCount++;
    }
  } catch(e) {
    // Corrupt save, start fresh
  }
}

function updateLongtimeButtons() {
  btn_longtimeInvest.text("Longtime Investment: invest " + longtimeAmount.toFixed(0) + " → get " + (longtimeAmount * longtimeReturn).toFixed(0) + " (" + longtimeTicks + " ticks)");
  btn_longtimeUpgrade.text("Upgrade Investment for " + longtimeUpgradePrice.toFixed(0) + " [Lv." + longtimeLevel + "]");
}

function refreshUI() {
  btn_cash.text(cash.toFixed(2) + "");
  btn_collector.text("Buy Collector for " + collectorPrice.toFixed(2) + " [" + collectorCount + "]");
  btn_collector_up.text("Upgrade Collectors for " + collectorLevelUpPrice.toFixed(2) + " [" + collectorLevel + "]");
  btn_investor.text("Buy Investor for " + investorPrice.toFixed(2) + " [" + investorCount + "]");
  btn_clickIncrease.text("Buy energy drink for " + clickIncreasePrice.toFixed(2));
  btn_officeIncrease.text("Increase your office for " + officePrice.toFixed(2));
  btn_grabLoan.text("Grab Loan (500 cash; 5%/10s interests) [" + loanCount + "]");

  // Re-show elements based on game state
  if (collectorCount > 0) {
    btn_collector.show();
    btn_collector_up.show();
    txt_cash.show();
    txt_salary.show();
    btn_stats.show();
    txt_plusClick.show();
    txt_plusCollector.show();
    txt_minusCollector.show();
    txt_totalCash.show();
  }
  if (investorCount > 0) {
    btn_investor.show();
    txt_plusInvestor.show();
    txt_minusInvestor.show();
  }
  if (cash > 199) btn_investor.show();
  if (collectorCount > 4) btn_grabLoan.show();
  if (dept > 0) btn_repayLoan.show();
  if (totalCash > 1000000) btn_bankruptcy.show();
  if ((collectorCount + investorCount) >= officeSpace) btn_officeIncrease.show();
  if (achievementCount > 0) btn_achievement.show();
  if (longtimeUnlocked == 1) {
    btn_longtimeInvest.show();
    if (longtimeTicksRemaining > 0) {
      btn_longtimeInvest.text("Longtime Investment: maturing...");
      txt_longtimeStatus.show();
    } else {
      btn_longtimeUpgrade.show();
      updateLongtimeButtons();
    }
  }

  // Re-append unlocked achievement DOM elements
  txt_achievement.empty();
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i][0] == 1) {
      txt_achievement.append($("<div class=\"frame p-[5px] m-2 border-2 border-solid border-white rounded-none text-[14pt] text-left masterTooltip\" title=\"" + achievements[i][3] + "\"/>").text(achievements[i][2]));
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
  // Office achievements
  [0, function() {
    return officeLevel > 2
  }, "Corner Office", "Your office is getting fancy."],
  [0, function() {
    return officeSpace > 20
  }, "Corporate Campus", "Room for a small army."],
  // Loan achievements
  [0, function() {
    return loanCount > 0
  }, "Debtor", "You took your first loan."],
  [0, function() {
    return dept > 2000
  }, "Drowning in Debt", "Maybe slow down on the loans."],
  [0, function() {
    return loanCount > 0 && dept == 0
  }, "Debt Free!", "You paid it all back. Impressive."],
  // Prestige achievements
  [0, function() {
    return prestigeLevel > 0
  }, "Fresh Start", "You declared bankruptcy for the first time."],
  [0, function() {
    return prestigeLevel > 2
  }, "Serial Bankrupt", "Bankruptcy is becoming a habit."],
  [0, function() {
    return prestigeMultiplier > 10
  }, "Financial Phoenix", "Rising from the ashes with style."],
];
