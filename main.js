class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("不好，门口有守卫者！");
      }, 1000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }

  static askForWaterK() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("路人指向了厨房的方向...");
      }, 1000);
    });
  }

  static askForWaterW() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("路人指向了洗手间的方向...");
      }, 1000);
    });
  }
  static choose() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("现在的你非常口渴，需要水源补充体力，选择寻找水源的位置...");
      }, 1000);
    });
  }
  static changeBackground(imagePath) {
    document.getElementById('game-background').style.backgroundImage = `url('${imagePath}')`;
  }

  static goToKitchen() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在厨房找到了水，解渴后继续寻宝...");
      }, 1000);
    });
  }
  static goToBathroom() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("在洗手间找到了水，解渴后继续寻宝...");
        }, 1000);
    });
}
static askForDirections(location) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`你向当地人询问了前往${location}的方向，他们指向了东南方的一条小路。`);
    }, 1000);
  });
}

static restForAWhile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("你在神庙外的一棵大树下休息了一会儿，恢复了体力。");
    }, 1000);
  });
}

static equipAdventureGear() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("你装备了探险装备，包括头灯和绳索，准备进入神庙。");
    }, 1000);
  });
}

static avoidGuard() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.7) {
        resolve("你巧妙地避开了守卫的视线，悄悄进入了神庙。");
      } else {
        reject("不幸的是，守卫发现了你，你被赶出了神庙。");
      }
    }, 1000);
  });
}
}

async function findTreasure() {
    try{
      TreasureMap.changeBackground('library-background.jpg');
    document.getElementById('game-status').textContent = "当前位置: 古老的图书馆";
    const clue = await TreasureMap.getInitialClue();
    document.getElementById('game-progress').textContent = clue;
    
    TreasureMap.changeBackground('script-background.jpg'); // 更改背景图片
    document.getElementById('game-status').textContent = "当前位置: 解码线索";
    const location = await TreasureMap.decodeAncientScript(clue);
    document.getElementById('game-progress').textContent = location;

    TreasureMap.changeBackground('water-background.jpg');
    document.getElementById('game-status').textContent = "当前位置: 寻找水源";
    const waterInfo = await TreasureMap.choose();
    document.getElementById('game-progress').textContent = waterInfo;

        // 显示按钮供用户选择
        document.getElementById('kitchen-btn').style.display = 'inline';
        document.getElementById('bathroom-btn').style.display = 'inline';

        // 等待用户选择
        const waterDecision = await new Promise((resolve) => {
            document.getElementById('kitchen-btn').addEventListener('click', () => {
                document.getElementById('kitchen-btn').style.display = 'none';
                document.getElementById('bathroom-btn').style.display = 'none';
                resolve('kitchen');
            });

            document.getElementById('bathroom-btn').addEventListener('click', () => {
                document.getElementById('kitchen-btn').style.display = 'none';
                document.getElementById('bathroom-btn').style.display = 'none';
                resolve('bathroom');
            });
        });

        // 根据用户选择执行相应的方法
        if (waterDecision === 'kitchen') {
            const waterInfo1 = await TreasureMap.askForWaterK();
            document.getElementById('game-progress').textContent = waterInfo1;
            TreasureMap.changeBackground('K.jpg');
            const kitchenWater = await TreasureMap.goToKitchen();
            document.getElementById('game-progress').textContent = kitchenWater;
            document.getElementById('game-status').textContent = "当前位置: 厨房";
        } else {
          const waterInfo2 = await TreasureMap.askForWaterW();
          document.getElementById('game-progress').textContent = waterInfo2;
          TreasureMap.changeBackground('wash.jpg')
          const bathroomWater= await TreasureMap.goToBathroom();
          document.getElementById('game-progress').textContent = bathroomWater;
           document.getElementById('game-status').textContent = "当前位置: 洗手间";
        }

      const directions = await TreasureMap.askForDirections("神庙");
      document.getElementById('game-progress').textContent = directions;
      TreasureMap.changeBackground('directions-background.jpg');
      document.getElementById('game-status').textContent = "询问前往神庙的方向...";
    
        // 休息一会儿
      const rest = await TreasureMap.restForAWhile();
      document.getElementById('game-progress').textContent = rest;
      TreasureMap.changeBackground('rest-background.jpg');
      document.getElementById('game-status').textContent = "在大树下休息...";
    
    // 装备探险装备
      const gear = await TreasureMap.equipAdventureGear();
      document.getElementById('game-progress').textContent = gear;
      TreasureMap.changeBackground('gear-background.jpg');
      document.getElementById('game-status').textContent = "装备探险装备...";
    
        
    // 寻找宝藏的流程
    document.getElementById('game-status').textContent = "当前位置: 古老的神庙";
    const box = await TreasureMap.searchTemple("神庙");
    document.getElementById('game-progress').textContent = box;
    TreasureMap.changeBackground('temple-background.jpg');

    // 尝试避开守卫
    TreasureMap.changeBackground('avoid.jpg');
    document.getElementById('game-status').textContent = "尝试避开守卫...";
    const avoidGuard = await TreasureMap.avoidGuard();
    document.getElementById('game-progress').textContent = avoidGuard;

    TreasureMap.changeBackground('treasure-background.jpg');
    document.getElementById('game-status').textContent = "当前位置: 打开宝箱";
    const treasure = await TreasureMap.openTreasureBox();
    document.getElementById('game-progress').textContent = treasure;
    TreasureMap.changeBackground('baozang.jpg');

  } catch (error) {
    document.getElementById('game-progress').textContent = `任务失败: 被守卫抓住`;
  }
};

document.getElementById('start-btn').addEventListener('click', findTreasure);
document.getElementById('exit-btn').addEventListener('click', () => {
document.getElementById('game-status').textContent = "游戏已退出";
document.getElementById('game-progress').textContent = "";
TreasureMap.changeBackground('end.jpg');
});