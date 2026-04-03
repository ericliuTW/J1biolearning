export const units = [
  {
    id: 'unit1',
    title: '2-3 突變與遺傳疾病',
    icon: '🧬',
    color: 'from-teal-400 to-emerald-500',
    concepts: [
      {
        id: 'concept1',
        title: '什麼是突變',
        interactionType: 'dnaMutator',
        content: {
          dna: ['A','T','C','G','A','T','C','G'],
          knowledgePoints: [
            { id: 'k1', title: '突變的定義', text: '突變就像打字打錯字一樣！我們身體裡有一條長長的「密碼」叫做 DNA，如果密碼裡的某個字被打錯了，就叫做突變。', emoji: '🔬' },
            { id: 'k2', title: '發生機率很低', text: '突變其實很少發生，就像你寫作業時，大部分時候都不會寫錯字一樣。身體在複製 DNA 的時候，幾乎都能正確複製。', emoji: '🎲' },
            { id: 'k3', title: '突變通常有害', text: '大部分的突變對生物是不好的，就像食譜上的字被改掉，做出來的菜可能會變難吃。但偶爾也有改得更好吃的情況！', emoji: '⚠️' },
            { id: 'k4', title: '演化的基礎', text: '少數有利的突變會讓生物更能適應環境，像是在冷的地方長出更厚的毛。這些好的改變會被保留下來，慢慢讓生物進步，這就是演化！', emoji: '🌱' },
          ]
        },
        quiz: {
          question: '關於突變，下列何者正確？',
          options: [
            '(A) 突變都是有害的',
            '(B) 遺傳物質發生變異的現象稱為突變',
            '(C) 突變都能遺傳給後代',
            '(D) 突變只能自然產生'
          ],
          correctIndex: 1,
          explanation: '突變就是 DNA（遺傳密碼）發生改變。突變不一定是壞事，也不一定會傳給小孩，而且人為因素（像輻射）也可以引起突變。'
        }
      },
      {
        id: 'concept2',
        title: '突變的部位',
        interactionType: 'clickExplore',
        content: {
          title: '探索不同細胞的突變',
          instruction: '點擊每種細胞，了解突變發生在不同部位的影響！',
          sceneEmoji: '🧬',
          items: [
            { id: 'skin', emoji: '🖐️', label: '表皮細胞', info: { title: '體細胞 — 表皮細胞', description: '皮膚細胞是體細胞的一種。就算它突變了，也不會影響你的小孩，因為皮膚細胞不會拿來生寶寶。', category: '體細胞', categoryColor: 'blue' }},
            { id: 'liver', emoji: '🫁', label: '肝細胞', info: { title: '體細胞 — 肝細胞', description: '肝臟的細胞也是體細胞。突變只會影響你自己的肝臟，不會傳給下一代。', category: '體細胞', categoryColor: 'blue' }},
            { id: 'nerve', emoji: '🧠', label: '神經細胞', info: { title: '體細胞 — 神經細胞', description: '腦袋裡的神經細胞也是體細胞，就算突變了也不會遺傳給小孩。', category: '體細胞', categoryColor: 'blue' }},
            { id: 'egg', emoji: '🥚', label: '卵細胞', info: { title: '生殖細胞 — 卵細胞', description: '卵細胞是用來生寶寶的細胞！如果卵細胞的 DNA 突變了，這個錯誤就可能傳給小孩，影響下一代的長相或健康。', category: '生殖細胞', categoryColor: 'red' }},
            { id: 'sperm', emoji: '🔵', label: '精細胞', info: { title: '生殖細胞 — 精細胞', description: '精細胞也是用來生寶寶的，所以如果它突變了，錯誤的 DNA 也可能傳給下一代。', category: '生殖細胞', categoryColor: 'red' }},
          ]
        },
        quiz: {
          question: '下列何種細胞發生變異可能會遺傳至後代？',
          options: [
            '(A) 表皮細胞',
            '(B) 肝細胞',
            '(C) 卵細胞',
            '(D) 神經細胞'
          ],
          correctIndex: 2,
          explanation: '只有「生殖細胞」（卵細胞和精細胞）的突變才會傳給小孩，因為它們是用來製造寶寶的。皮膚、肝臟、神經都是體細胞，突變只會影響自己。'
        }
      },
      {
        id: 'concept3',
        title: '誘導突變的因素',
        interactionType: 'clickExplore',
        content: {
          title: '什麼因素會誘導突變？',
          instruction: '點擊每個因素，了解它如何造成 DNA 突變！',
          sceneEmoji: '⚡',
          items: [
            { id: 'radiation', emoji: '☢️', label: '核輻射', info: { title: '核輻射', description: '核輻射就像超強的能量子彈，可以直接打壞 DNA，讓密碼亂掉或斷掉，造成突變。', category: '物理因素', categoryColor: 'red' }},
            { id: 'xray', emoji: '🔬', label: 'X 光', info: { title: 'X 光', description: 'X 光就是去醫院照骨頭用的那種光。照一點點沒問題，但照太多可能會傷害 DNA。所以照 X 光時，護理師會幫你穿重重的鉛衣保護身體！', category: '物理因素', categoryColor: 'red' }},
            { id: 'uv', emoji: '☀️', label: '紫外線', info: { title: '紫外線', description: '太陽光裡面有一種看不見的光叫紫外線，它會傷害皮膚細胞的 DNA。這就是為什麼大人一直叫你擦防曬乳的原因！', category: '物理因素', categoryColor: 'red' }},
            { id: 'nitrite', emoji: '🥓', label: '亞硝酸鹽食物', info: { title: '亞硝酸鹽', description: '香腸、火腿、臘肉這些加工食品裡面有亞硝酸鹽，吃進身體後可能變成會破壞 DNA 的壞東西。所以這些食物不要吃太多！', category: '化學因素', categoryColor: 'orange' }},
          ]
        },
        quiz: {
          question: '遺傳物質變異可能對後代造成什麼影響？',
          options: [
            '(A) 必定使後代滅絕',
            '(B) 造成性狀或表徵改變',
            '(C) 保留親代性狀',
            '(D) 沒有任何影響'
          ],
          correctIndex: 1,
          explanation: 'DNA 密碼被改了，做出來的東西就可能不一樣，所以生物的外觀或身體功能可能會改變。但不一定會滅絕啦，有時候改變很小。'
        }
      },
      {
        id: 'concept4',
        title: '遺傳疾病種類',
        interactionType: 'clickExplore',
        content: {
          title: '認識遺傳疾病',
          instruction: '點擊每種遺傳疾病，了解它的成因！',
          sceneEmoji: '🧬',
          items: [
            { id: 'albinism', emoji: '👤', label: '白化症', info: { title: '白化症 — 隱性等位基因異常', description: '白化症就像一個「隱藏版」的基因問題。爸爸和媽媽可能看起來都很正常，但他們都偷偷帶著一個異常基因。如果小孩剛好從爸媽那邊各拿到一個異常基因，就會發病。帶著基因但沒發病的人叫做「帶因者」。', category: '隱性遺傳', categoryColor: 'purple' }},
            { id: 'achon', emoji: '🦴', label: '軟骨發育不全症', info: { title: '軟骨發育不全症 — 顯性等位基因異常', description: '這種病只要有一個異常基因就會發病，就像開關一樣，有就是有。如果爸媽其中一個人有這個基因，小孩就有一半的機率會遺傳到。', category: '顯性遺傳', categoryColor: 'blue' }},
            { id: 'down', emoji: '🧩', label: '唐氏症', info: { title: '唐氏症 — 染色體數目異常', description: '正常人有 23 對染色體，但唐氏症的人在第 21 對多了一條（變成三條）。這不是基因打錯字，而是染色體在分配的時候出了差錯，就像發牌的時候多發了一張一樣。', category: '染色體異常', categoryColor: 'teal' }},
            { id: 'recessive_explain', emoji: '📊', label: '什麼是隱性遺傳？', info: { title: '隱性遺傳的機制', description: '想像基因像撲克牌，隱性遺傳疾病要拿到「兩張一樣的壞牌」才會發病。只拿到一張壞牌的人叫「帶因者」，自己不會生病，但可能把壞牌傳給小孩。', category: '知識補充', categoryColor: 'gray' }},
            { id: 'dominant_explain', emoji: '📈', label: '什麼是顯性遺傳？', info: { title: '顯性遺傳的機制', description: '顯性遺傳疾病只要拿到「一張壞牌」就會發病。如果爸媽有一個人帶有這張壞牌，小孩有 50% 的機率也會拿到。', category: '知識補充', categoryColor: 'gray' }},
          ]
        },
        quiz: {
          question: '唐氏症的成因為何？',
          options: [
            '(A) 隱性等位基因異常',
            '(B) 顯性等位基因異常',
            '(C) 染色體數目異常',
            '(D) 體細胞突變'
          ],
          correctIndex: 2,
          explanation: '唐氏症是因為第 21 對染色體多了一條（變成三條），就像發牌時多發了一張。這是染色體數目出錯，不是基因突變喔！'
        }
      },
      {
        id: 'concept5',
        title: '性聯遺傳',
        interactionType: 'clickExplore',
        content: {
          title: '認識性聯遺傳',
          instruction: '有些遺傳疾病跟性別有關！點擊每個項目，了解為什麼有些病男生比較容易得到。',
          sceneEmoji: '🧬',
          items: [
            { id: 'y_linked', emoji: '👨', label: 'Y染色體遺傳', info: { title: 'Y染色體遺傳', description: '有些基因只在Y染色體上。因為只有男生有Y染色體（XY），女生是XX沒有Y，所以Y染色體上的疾病只會從爸爸傳給兒子，女兒絕對不會得到！如果爸爸有Y染色體遺傳疾病，他所有的兒子都會遺傳到（100%），但女兒完全不受影響。', category: 'Y染色體', categoryColor: 'blue' }},
            { id: 'x_recessive', emoji: '👩', label: 'X染色體隱性遺傳', info: { title: 'X染色體隱性遺傳', description: '有些疾病的基因在X染色體上，而且是隱性的。女生有兩條X染色體，就算一條有問題，另一條正常的可以「罩住」，所以女生通常只是帶因者不會發病。但男生只有一條X染色體，只要那條有問題就會發病！所以蠶豆症（G6PD缺乏症）、色盲、血友病這些病，男生得到的比例比女生高很多。如果媽媽是帶因者，兒子有50%機率發病。', category: 'X染色體隱性', categoryColor: 'red' }},
            { id: 'not_genetic', emoji: '🏥', label: '非遺傳疾病辨別', info: { title: '不是所有疾病都是遺傳的！', description: '要小心分辨遺傳疾病和非遺傳疾病！例如B型肝炎是由病毒感染造成的「傳染病」，不是遺傳疾病。雖然媽媽可能在生產時傳給寶寶，但那是「垂直感染」不是遺傳。遺傳疾病是DNA出了問題才算，像蠶豆症、白化症、唐氏症才是遺傳疾病。', category: '知識補充', categoryColor: 'gray' }},
          ]
        },
        quiz: {
          question: '如果爸爸有Y染色體遺傳疾病，下列何者正確？',
          options: [
            '(A) 女兒一定會遺傳到',
            '(B) 兒子和女兒都有50%機率遺傳',
            '(C) 所有兒子都會遺傳到，女兒不會',
            '(D) 只有女兒會遺傳到'
          ],
          correctIndex: 2,
          explanation: 'Y染色體只會從爸爸傳給兒子（因為女兒拿到的是爸爸的X染色體）。所以爸爸的Y染色體疾病，100%的兒子都會有，但女兒完全不受影響！'
        }
      },
      {
        id: 'concept6',
        title: '遺傳疾病的諮詢',
        interactionType: 'stepProcess',
        content: {
          title: '遺傳諮詢的流程',
          steps: [
            { emoji: '📋', visual: '病患 → 醫生', title: '步驟一：提供個人病史', description: '就像去看醫生時要先填資料一樣，要告訴醫生你以前生過什麼病、身體有什麼狀況，讓醫生了解你的遺傳背景。', actionText: '提交病史資料', resultText: '醫生已記錄你的個人病史。' },
            { emoji: '👨‍👩‍👧‍👦', visual: '家族樹 → 分析', title: '步驟二：提供家族病史', description: '醫生會問你的家族裡有沒有人生過遺傳疾病，像是爺爺奶奶、爸爸媽媽、兄弟姊妹有沒有特別的健康問題。', actionText: '提交家族資料', resultText: '醫生發現家族中有遺傳疾病的記錄，需要進一步檢查。' },
            { emoji: '🤰', visual: '產前檢查', title: '步驟三：產前檢查', description: '如果媽媽懷孕了，可以做檢查看看寶寶在肚子裡是不是健康的，有沒有遺傳疾病，這樣可以提早準備。', actionText: '進行產前檢查', resultText: '產前檢查結果正常，胎兒發育良好。' },
            { emoji: '👶', visual: '新生兒篩檢', title: '步驟四：新生兒篩檢', description: '寶寶一出生就會做檢查，看看有沒有遺傳疾病。越早發現就越早治療，效果越好！', actionText: '進行新生兒篩檢', resultText: '篩檢完成！及早發現遺傳疾病可以及早治療。' },
            { emoji: '💑', visual: '婚前諮詢', title: '步驟五：近親不得結婚', description: '法律規定親戚之間不能結婚。因為親戚的基因很像，如果都帶著同一個「壞基因」，小孩拿到兩個壞基因的機率就會大很多，很容易生病。', actionText: '了解法律規定', resultText: '了解了！近親結婚會增加異常隱性等位基因結合的機率。' },
          ]
        },
        quiz: {
          question: '新生兒篩檢的主要目的為何？',
          options: [
            '(A) 確認血型',
            '(B) 測量體重',
            '(C) 及早發現遺傳疾病並治療',
            '(D) 決定是否需要手術'
          ],
          correctIndex: 2,
          explanation: '新生兒篩檢最重要的目的是趁早找到遺傳疾病。就像考試一樣，越早發現錯誤越容易改正，治療效果也越好！'
        }
      }
    ]
  },
  {
    id: 'unit2',
    title: '2-4 生物技術',
    icon: '🔬',
    color: 'from-blue-400 to-cyan-500',
    concepts: [
      {
        id: 'concept1',
        title: '生物技術是什麼',
        interactionType: 'clickExplore',
        content: {
          title: '生活中的生物技術',
          instruction: '點擊每個物品，看看哪些微生物幫助我們製作它！',
          sceneEmoji: '🔬',
          items: [
            { id: 'bread', emoji: '🍞', label: '麵包', info: { title: '麵包 — 酵母菌', description: '麵包為什麼會軟軟膨膨的？因為酵母菌在麵團裡面「呼吸」的時候，會吐出二氧化碳氣體，把麵團吹得像氣球一樣膨脹！', category: '微生物應用', categoryColor: 'amber' }},
            { id: 'yogurt', emoji: '🥛', label: '優酪乳', info: { title: '優酪乳 — 乳酸菌', description: '乳酸菌是牛奶的魔術師！它把牛奶裡的糖（乳糖）變成酸酸的乳酸，讓牛奶變濃變酸，就變成好喝的優酪乳了。', category: '微生物應用', categoryColor: 'amber' }},
            { id: 'soysauce', emoji: '🫘', label: '醬油', info: { title: '醬油 — 麴菌', description: '醬油是用大豆做的，但光靠大豆還不夠！麴菌會幫忙把大豆裡的蛋白質分解掉，經過好幾個月的發酵，才會變成又香又鹹的醬油。', category: '微生物應用', categoryColor: 'amber' }},
            { id: 'cheese', emoji: '🧀', label: '起司', info: { title: '起司 — 乳酸菌與凝乳酶', description: '起司就是「濃縮版」的牛奶！乳酸菌和一種叫「凝乳酶」的東西會讓牛奶凝固，再經過一段時間熟成，就變成各種口味的起司。', category: '微生物應用', categoryColor: 'amber' }},
            { id: 'biotech_def', emoji: '🧬', label: '什麼是生物技術？', info: { title: '生物技術的定義', description: '簡單來說，生物技術就是「利用生物來幫人類做事」。不管是用微生物做食物、用細菌做藥物，還是改良農作物，都算是生物技術！', category: '核心概念', categoryColor: 'teal' }},
          ]
        },
        quiz: {
          question: '下列何者不是人類利用微生物改善生活的例子？',
          options: [
            '(A) 酵母菌製麵包',
            '(B) 乳酸桿菌製優酪乳',
            '(C) 育種將野生甘藍培育成蔬菜',
            '(D) 基因轉殖使細菌製造胰島素'
          ],
          correctIndex: 2,
          explanation: '育種是人類自己挑選想要的品種來培育，並沒有用到微生物幫忙。其他三個都是讓微生物來工作！'
        }
      },
      {
        id: 'concept2',
        title: '育種',
        interactionType: 'timelineExplorer',
        content: {
          title: '育種的演變',
          instruction: '點擊每個階段，了解育種如何改變生物！',
          stages: [
            { id: 's1', period: '野生祖先', emoji: '🐺', title: '野生灰狼', description: '你知道嗎？所有的狗狗，不管是柴犬、哈士奇還是吉娃娃，祖先都是野生的灰狼！幾萬年前，人類開始養比較溫馴的狼，慢慢把牠們變成家犬。', highlights: [{ label: '物種', value: '灰狼' }, { label: '特徵', value: '野性、獨立' }, { label: '時間', value: '數萬年前' }] },
            { id: 's2', period: '傳統育種', emoji: '🐕', title: '人為選擇特定性狀', description: '傳統育種就像「選秀比賽」，人類從一群動物或植物裡面，挑選自己喜歡的特徵（像比較大、比較甜、毛色比較好看），讓它們生下一代。這樣做很多很多代之後，就會培育出新品種。', highlights: [{ label: '方法', value: '挑選交配' }, { label: '速度', value: '緩慢（數百年）' }, { label: '結果', value: '各種犬' }] },
            { id: 's3', period: '野生甘藍', emoji: '🥬', title: '野生甘藍的多樣變化', description: '超神奇！高麗菜、花椰菜、大頭菜其實都是同一種植物（野生甘藍）變來的！人類挑選葉子大的就變成高麗菜，挑選花大的就變成花椰菜，挑選莖粗的就變成大頭菜。', highlights: [{ label: '祖先', value: '野生甘藍' }, { label: '選葉子', value: '高麗菜' }, { label: '選花', value: '花椰菜' }, { label: '選莖', value: '大頭菜' }] },
            { id: 's4', period: '現代育種', emoji: '🧪', title: '人為誘導突變', description: '現代科學家等不及慢慢選了！他們用輻射或化學藥劑讓 DNA 快速突變，然後從裡面找到好的變化，大大加快了品種改良的速度。', highlights: [{ label: '方法', value: '誘導突變' }, { label: '速度', value: '快速' }, { label: '工具', value: '輻射、化學物質' }] },
          ]
        },
        quiz: {
          question: '關於育種，下列何者正確？',
          options: [
            '(A) 傳統育種速度比現代育種快',
            '(B) 現代育種透過人為誘導突變來加速選出品系',
            '(C) 所有犬種都是現代育種的結果',
            '(D) 育種不會改變生物的基因'
          ],
          correctIndex: 1,
          explanation: '現代育種用輻射或化學藥劑讓 DNA 快速突變，再從裡面選出好的，比傳統的慢慢挑選快多了！'
        }
      },
      {
        id: 'concept3',
        title: '複製動物',
        interactionType: 'cloningLab',
        content: {
          title: '複製羊桃莉的實驗室'
        },
        quiz: {
          question: '複製動物的過程屬於？',
          options: [
            '(A) 有性生殖，體內受精',
            '(B) 有性生殖，體外受精',
            '(C) 無性生殖',
            '(D) 有性生殖，無受精'
          ],
          correctIndex: 2,
          explanation: '複製動物不需要精子和卵子結合（沒有受精），而是把一般細胞的「核」放進去掉核的卵細胞裡，所以算是無性生殖。就像「影印」一隻羊！'
        }
      },
      {
        id: 'concept4',
        title: '基因轉殖技術',
        interactionType: 'geneTransferLab',
        content: {
          title: '基因轉殖實驗室'
        },
        quiz: {
          question: '關於基因轉殖，下列何者正確？',
          options: [
            '(A) 只能在動物間進行',
            '(B) 螢光魚是將水母基因轉殖到魚體內',
            '(C) 基因改造食品完全沒有風險',
            '(D) 基因轉殖不會改變生物的性狀'
          ],
          correctIndex: 1,
          explanation: '螢光魚超酷！科學家把水母身上會發光的基因「搬」到魚的身體裡，讓魚也能發出螢光。基因轉殖可以跨物種進行，就像把不同拼圖的零件拼在一起。'
        }
      },
      {
        id: 'concept5',
        title: '生物技術的隱憂',
        interactionType: 'clickExplore',
        content: {
          title: '生物技術帶來的隱憂',
          instruction: '點擊每個議題，想想看這些技術可能帶來什麼問題！',
          sceneEmoji: '⚖️',
          items: [
            { id: 'breeding_issue', emoji: '🐕', label: '過度育種', info: { title: '育種的健康代價', description: '很多品種狗因為人類只追求「好看」，反而變得很不健康。比如鬥牛犬的臉被刻意壓扁，結果呼吸很困難；臘腸犬被故意培育成長身體短腿，脊椎常常出問題。為了讓牠們好看，反而害牠們受苦了。', category: '育種隱憂', categoryColor: 'orange' }},
            { id: 'clone_issue', emoji: '🐑', label: '複製動物的問題', info: { title: '複製動物的健康與倫理', description: '世界上第一隻複製羊「桃莉」只活了 6 年就生病死了，比一般羊短命很多。複製動物常常有「老得快」、「容易生病」的問題。而且大家也在想一個可怕的問題：如果可以複製人類，你覺得這是好事還是壞事？', category: '複製隱憂', categoryColor: 'red' }},
            { id: 'gene_escape', emoji: '🌾', label: '基因外流', info: { title: '轉殖基因流入野外', description: '想像你改造了一種超級強壯的玉米，結果它的花粉被風吹到旁邊的野生植物上，讓野草也變得超強壯、殺不死。這就是「基因外流」！基因改造作物的基因可能跑到野外，打亂大自然的平衡，造成沒人預料到的問題。', category: '生態隱憂', categoryColor: 'green' }},
            { id: 'ethics', emoji: '⚖️', label: '倫理議題', info: { title: '實驗與環境倫理', description: '做實驗的時候，動物會不會痛？我們應該怎麼對待牠們？另外，為了科技進步去破壞環境，這樣對嗎？科學家在發展新技術的同時，也要好好想一想：這樣做對動物和地球公平嗎？', category: '倫理思考', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '關於生物技術的隱憂，下列何者錯誤？',
          options: [
            '(A) 育種可能對生物健康造成負擔',
            '(B) 複製動物可能有壽命問題',
            '(C) 轉殖基因絕對不會流入野外環境',
            '(D) 生物技術需兼顧環境倫理'
          ],
          correctIndex: 2,
          explanation: '說「絕對不會」就錯了！改造作物的花粉可能被風吹到野外，讓野生植物也得到改造過的基因。這就像把秘密配方不小心洩漏出去一樣，後果很難控制。'
        }
      }
    ]
  },
  {
    id: 'unit3',
    title: '3-1 化石與演化',
    icon: '🦴',
    color: 'from-amber-400 to-orange-500',
    concepts: [
      {
        id: 'concept1',
        title: '什麼是化石',
        interactionType: 'digReveal',
        content: {
          instruction: '點擊岩層來挖掘化石！看看你能發現什麼？',
          fossils: [
            { id: 'f1', emoji: '🦴', name: '恐龍骨骼', category: '遺骸化石', info: '恐龍死掉之後，硬硬的骨頭被埋在土裡，經過幾百萬年慢慢變成石頭，就成了化石。就像大自然幫恐龍做了一個「石頭模型」！' },
            { id: 'f2', emoji: '🐚', name: '三葉蟲外殼', category: '遺骸化石', info: '三葉蟲是很久很久以前住在海裡的生物，牠有堅硬的外殼，所以很容易變成化石保存下來。' },
            { id: 'f3', emoji: '🦟', name: '琥珀中的昆蟲', category: '遺骸化石', info: '有些小蟲子被黏黏的樹脂包住，樹脂變硬後就像天然的「標本盒」，把小蟲子完完整整地保存了幾千萬年！' },
            { id: 'f4', emoji: '🐾', name: '腳印化石', category: '遺跡化石', info: '恐龍踩在軟軟的泥巴上留下腳印，泥巴後來變成石頭，腳印就被保存下來了。這不是身體的一部分，而是「活動的痕跡」。' },
            { id: 'f5', emoji: '💩', name: '糞便化石', category: '遺跡化石', info: '沒錯，連大便也能變成化石！科學家可以從裡面找到沒消化完的食物殘渣，知道這隻動物以前吃什麼。' },
            { id: 'f6', emoji: '🐟', name: '腔棘魚', category: '活化石', info: '腔棘魚長得跟幾億年前的祖先幾乎一模一樣，就像時間在牠身上停住了一樣！牠的親戚大部分都已經滅絕了，只剩牠還活著，所以被叫做「活化石」。' },
            { id: 'f7', emoji: '🌿', name: '銀杏', category: '活化石', info: '銀杏在恐龍時代就存在了！到現在長得還是差不多，牠的同類大部分都消失了，只有銀杏存活下來，所以也是「活化石」。' },
            { id: 'f8', emoji: '🧱', name: '化石形成條件', category: '知識補充', info: '不是所有生物都能變成化石！通常要有堅硬的構造（像外骨骼、細胞壁、貝殼、骨骼）才容易被保存。軟綿綿的水母就很難變成化石。最古老的化石就是有細胞壁的微生物！而且化石被發現的位置也很重要——如果山頂上發現海洋生物化石，代表這裡曾經是海底，後來因為地殼變動被抬升到高山上了。' },
          ],
          categories: ['遺骸化石', '遺跡化石', '活化石', '知識補充']
        },
        quiz: {
          question: '下列關於化石的敘述何者正確？',
          options: [
            '(A) 生物移動的痕跡無法成為化石',
            '(B) 恐龍的糞便屬於遺骸化石',
            '(C) 現今沒有恐龍，但岩層中有恐龍化石，表示這個生物曾經存在過',
            '(D) 成為化石的生物種類現今都已消失'
          ],
          correctIndex: 2,
          explanation: '化石就像大自然的「歷史照片」。岩層裡有恐龍化石，就代表恐龍以前真的存在過。腳印可以變成遺跡化石；糞便也是遺跡化石（不是身體的一部分）；腔棘魚和銀杏是活化石，所以不是所有化石生物都消失了。'
        }
      },
      {
        id: 'concept2',
        title: '從化石得到的資訊',
        interactionType: 'fossilSortingGame',
        content: {
          title: '化石能告訴我們什麼？',
          items: [
            { text: '古代生物的外型和骨骼結構', canKnow: true, explanation: '化石保存了生物的骨頭、牙齒和外殼形狀，讓我們知道古代生物長什麼樣子。' },
            { text: '古代生物的膚色或體色', canKnow: false, explanation: '顏色很難變成化石保存下來，所以恐龍到底是什麼顏色，科學家只能猜測。' },
            { text: '古代生物生存的年代', canKnow: true, explanation: '透過化石所在的岩層和放射性定年法，可以知道這個生物大概活在多久以前。' },
            { text: '古代生物的叫聲和行為', canKnow: false, explanation: '聲音和行為不會變成化石，所以電影裡恐龍的叫聲其實都是人想像出來的！' },
            { text: '古代的環境和氣候', canKnow: true, explanation: '化石旁邊的岩石和其他化石可以告訴我們當時的環境，例如有珊瑚化石代表以前這裡是溫暖的海洋。' },
            { text: '古代生物的完整DNA', canKnow: false, explanation: 'DNA會隨時間分解，超過幾百萬年的化石幾乎不可能保存完整DNA。侏羅紀公園的情節在現實中做不到！' },
          ]
        },
        quiz: {
          question: '從化石無法知道古生物的什麼資訊？',
          options: [
            '(A) 形態',
            '(B) 構造',
            '(C) 環境變遷',
            '(D) 皮膚顏色'
          ],
          correctIndex: 3,
          explanation: '化石只能保留硬的東西（像骨頭和外殼），皮膚的顏色太軟了，沒辦法變成化石。所以恐龍到底是什麼顏色？其實沒有人真正知道！'
        }
      },
      {
        id: 'concept3',
        title: '馬的演化',
        interactionType: 'timelineExplorer',
        content: {
          title: '馬的演化歷程',
          instruction: '點擊各個時期，觀察馬如何演化！',
          stages: [
            { id: 'era1', period: '約5000萬年前', emoji: '🦊', title: '始祖馬', description: '最早的馬居然只有狐狸那麼小！牠有四個腳趾，住在森林裡吃嫩嫩的葉子。牙齒也很簡單，因為不需要咬很硬的東西。', highlights: [{ label: '體型', value: '小如狐狸' }, { label: '前肢', value: '四趾' }, { label: '食物', value: '嫩葉' }, { label: '牙齒', value: '溝紋簡單' }, { label: '環境', value: '森林' }] },
            { id: 'era2', period: '約3000萬年前', emoji: '🐕', title: '漸新馬', description: '馬慢慢變大了，大概跟一隻中型狗差不多。腳趾從四個變成三個，中間的趾頭變得比較大。因為森林慢慢消失，牠開始學習在草原上生活。', highlights: [{ label: '體型', value: '中型犬大小' }, { label: '前肢', value: '三趾' }, { label: '環境', value: '森林→草原過渡' }] },
            { id: 'era3', period: '約1000萬年前', emoji: '🐎', title: '上新馬', description: '馬又變更大了，中間的趾頭越來越大，旁邊的小趾頭越來越小。牙齒變得更複雜，因為要咬硬硬的草。已經完全是草原上的動物了。', highlights: [{ label: '體型', value: '接近現代馬' }, { label: '前肢', value: '中趾發達' }, { label: '食物', value: '青草' }, { label: '牙齒', value: '溝紋複雜' }] },
            { id: 'era4', period: '約200萬年前至今', emoji: '🐴', title: '現代馬', description: '現代馬又高又壯，四個腳趾最後只剩下一個，變成了「蹄」，讓牠可以在草原上飛快奔跑。牙齒紋路很複雜，專門用來磨碎硬硬的草。', highlights: [{ label: '體型', value: '高大' }, { label: '前肢', value: '單趾（蹄）' }, { label: '食物', value: '青草' }, { label: '牙齒', value: '溝紋複雜' }, { label: '環境', value: '草原' }] },
          ]
        },
        quiz: {
          question: '馬在演化過程中，前肢腳趾的變化為？',
          options: [
            '(A) 單趾→三趾→四趾',
            '(B) 四趾→三趾→單趾',
            '(C) 四趾→單趾→三趾',
            '(D) 沒有改變'
          ],
          correctIndex: 1,
          explanation: '馬的腳趾從四個慢慢變成三個，最後只剩一個（就是蹄）。越來越少的腳趾讓馬跑得更快，就像穿上了跑鞋一樣！'
        }
      },
      {
        id: 'concept4',
        title: '生物演化的趨勢與環境',
        interactionType: 'evolutionMatchGame',
        content: {
          title: '演化的方向',
          trends: [
            { from: '水生', to: '陸生', emoji: '🐟→🦎', explanation: '最早的生物住在海裡，後來有些慢慢發展出可以在陸地生活的能力，像魚的鰭慢慢變成了腳。' },
            { from: '簡單', to: '複雜', emoji: '🦠→🐘', explanation: '從只有一個細胞的細菌，慢慢演化出有很多細胞、很複雜的動植物。' },
            { from: '小型', to: '大型（不一定）', emoji: '🐁→🐘', explanation: '很多生物確實越來越大，但也有例外！恐龍很大卻滅絕了，小小的蟑螂卻活了幾億年。大不一定就是好的。' },
          ],
          environments: [
            { name: '冰河時期', effect: '毛多、脂肪厚的動物比較容易活下來', emoji: '🧊' },
            { name: '森林消失', effect: '會爬樹的動物要學會在地面生活，人類的祖先可能就是這樣站起來的', emoji: '🌳' },
            { name: '氧氣增加', effect: '更多氧氣讓生物可以長更大、跑更快', emoji: '💨' },
          ]
        },
        quiz: {
          question: '在地層中發現下列何者，最能做為該地層過去曾位於海裡的證據？',
          options: [
            '(A) 隕石',
            '(B) 馬的化石',
            '(C) 火成岩的岩脈',
            '(D) 三葉蟲的化石'
          ],
          correctIndex: 3,
          explanation: '三葉蟲是古代海洋裡的生物，所以挖到三葉蟲化石就代表這個地方以前是海底！就像你在沙灘上撿到貝殼，就知道海浪曾經到過那裡一樣。'
        }
      }
    ]
  },
  {
    id: 'unit4',
    title: '3-2 生物的命名與分類',
    icon: '📋',
    color: 'from-indigo-400 to-violet-500',
    concepts: [
      {
        id: 'concept1',
        title: '俗名與學名',
        interactionType: 'clickExplore',
        content: {
          title: '生物的名字怎麼取？',
          instruction: '點擊每個例子，了解俗名和學名的差別！',
          sceneEmoji: '📛',
          items: [
            { id: 'cat', emoji: '🐱', label: '貓', info: { title: '貓的名字', description: '貓在台灣叫「貓」，英文叫 Cat，日文叫 ネコ。每個地方都不一樣！但全世界科學家都用同一個學名：Felis catus。學名就像生物的「身分證號碼」，不管你在哪個國家，都能找到同一種生物。', category: '俗名 vs 學名', categoryColor: 'blue' }},
            { id: 'sweet_potato', emoji: '🍠', label: '番薯', info: { title: '番薯的混亂', description: '番薯在不同地方有不同叫法：番薯、地瓜、甘薯⋯都是同一種東西！這就是俗名的缺點——容易搞混。科學家給它一個學名 Ipomoea batatas，全世界都知道在說哪一種植物。', category: '同物異名', categoryColor: 'orange' }},
            { id: 'mouse', emoji: '🐭', label: '老鼠', info: { title: '「老鼠」太多種了！', description: '你說「老鼠」，到底是哪一種？溝鼠？田鼠？倉鼠？「老鼠」這個俗名涵蓋了好幾十種不同的動物。有了學名，科學家才能精準指定是哪一種。', category: '一名多物', categoryColor: 'red' }},
            { id: 'why', emoji: '🤔', label: '為什麼需要學名？', info: { title: '學名的重要性', description: '想像你在網路上查一種生物的資料，全世界每個國家都用自己的語言叫它不同名字，你根本搜不到！有了統一的學名，全世界的科學家就能用同一種語言溝通，不會再搞混了。', category: '核心概念', categoryColor: 'teal' }},
            { id: 'linnaeus', emoji: '👨‍🔬', label: '林奈', info: { title: '分類學之父——林奈', description: '瑞典科學家林奈發明了「二名法」，用兩個拉丁文單字幫生物取學名。第一個字是「屬名」（就像你的姓），第二個字是「種小名」（就像你的名字）。例如人類叫 Homo sapiens。', category: '知識補充', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '關於生物的命名，下列何者正確？',
          options: [
            '(A) 俗名全世界都一樣',
            '(B) 學名用英文書寫',
            '(C) 學名是全世界統一的科學名稱',
            '(D) 每種生物只有一個俗名'
          ],
          correctIndex: 2,
          explanation: '學名是用拉丁文寫的，全世界科學家都用同一個名稱，不會因為語言不同而搞混。俗名在不同地方可能不一樣，而且一種生物可能有好幾個俗名。'
        }
      },
      {
        id: 'concept2',
        title: '俗名與學名配對',
        interactionType: 'matchingPairs',
        content: {
          title: '配對俗名和學名',
          instruction: '學了那麼多學名，來試試看你記住了沒！把左邊的俗名拖到右邊對應的學名。',
          leftLabel: '俗名',
          rightLabel: '學名',
          pairs: [
            { id: 'p1', left: { text: '貓', emoji: '🐱' }, right: { text: 'Felis catus', emoji: '🏷️' }, explanation: '家貓的學名是 Felis catus，Felis 是屬名，catus 是種小名' },
            { id: 'p2', left: { text: '人類', emoji: '🧑' }, right: { text: 'Homo sapiens', emoji: '🏷️' }, explanation: '人類的學名是 Homo sapiens，意思是「聰明的人」' },
            { id: 'p3', left: { text: '狗', emoji: '🐕' }, right: { text: 'Canis familiaris', emoji: '🏷️' }, explanation: '家犬的學名是 Canis familiaris，跟狼（Canis lupus）同屬' },
            { id: 'p4', left: { text: '水稻', emoji: '🌾' }, right: { text: 'Oryza sativa', emoji: '🏷️' }, explanation: '水稻的學名是 Oryza sativa，全世界一半以上的人以它為主食' },
            { id: 'p5', left: { text: '番薯', emoji: '🍠' }, right: { text: 'Ipomoea batatas', emoji: '🏷️' }, explanation: '番薯（地瓜）的學名是 Ipomoea batatas，俗名在各地不同但學名統一' },
            { id: 'p6', left: { text: '獅子', emoji: '🦁' }, right: { text: 'Panthera leo', emoji: '🏷️' }, explanation: '獅子的學名是 Panthera leo，跟老虎（Panthera tigris）同屬' },
          ]
        },
        quiz: {
          question: '下列學名的書寫方式何者正確？',
          options: [
            '(A) homo sapiens',
            '(B) Homo Sapiens',
            '(C) Homo sapiens',
            '(D) HOMO SAPIENS'
          ],
          correctIndex: 2,
          explanation: '學名的規則：屬名第一個字母大寫，種小名全部小寫，而且要斜體或畫底線。所以 Homo sapiens 才是正確的寫法！'
        }
      },
      {
        id: 'concept3',
        title: '二名法',
        interactionType: 'stepProcess',
        content: {
          title: '學名怎麼寫？——二名法',
          steps: [
            { emoji: '✍️', visual: '屬名 + 種小名', title: '規則一：兩個字組成', description: '學名由兩個拉丁文單字組成。第一個字是「屬名」（像姓氏），第二個字是「種小名」（像名字）。例如人類的學名是 Homo sapiens，Homo 是屬名，sapiens 是種小名。', actionText: '了解', resultText: '學名 = 屬名 + 種小名' },
            { emoji: '🔤', visual: 'Homo sapiens', title: '規則二：大小寫', description: '屬名的第一個字母要大寫，種小名全部小寫。例如：Homo sapiens（人類）、Felis catus（貓）、Canis lupus（狼）。', actionText: '記住了', resultText: '屬名大寫開頭，種小名全小寫' },
            { emoji: '📝', visual: 'Homo sapiens', title: '規則三：要斜體', description: '學名在印刷品上要用斜體字，手寫的時候要畫底線。這樣別人一看就知道這是學名，不是普通的字。', actionText: '了解', resultText: '印刷用斜體，手寫畫底線' },
            { emoji: '👪', visual: '貓科 → 貓屬 → 家貓', title: '屬名相同 = 親戚', description: '屬名一樣的生物代表牠們是近親。例如 Felis catus（家貓）和 Felis silvestris（野貓）都姓 Felis，代表牠們關係很近，就像同一個家族的成員。', actionText: '太酷了', resultText: '屬名相同的生物親緣關係較近！' },
          ]
        },
        quiz: {
          question: '下列何者能說明兩種生物的親緣關係較近？',
          options: [
            '(A) 俗名相似',
            '(B) 體型差不多',
            '(C) 學名的屬名相同',
            '(D) 住在同一個地方'
          ],
          correctIndex: 2,
          explanation: '學名的屬名相同代表同一屬，親緣關係比較近。像家貓 Felis catus 和野貓 Felis silvestris 都是 Felis 屬，是近親！'
        }
      },
      {
        id: 'concept4',
        title: '分類的七個階層',
        interactionType: 'clickExplore',
        content: {
          title: '生物分類的七個層級',
          instruction: '先來認識分類的七個階層，等一下要考你排序喔！',
          sceneEmoji: '📊',
          items: [
            { id: 'kingdom', emoji: '🌍', label: '界', info: { title: '界（最大）', description: '「界」是最大的分類，就像把所有生物分成幾個超大的家族。目前分成五界：原核生物界、原生生物界、真菌界、植物界、動物界。', category: '最大', categoryColor: 'red' }},
            { id: 'phylum', emoji: '🚪', label: '門', info: { title: '門', description: '同一界裡面再細分成幾個「門」。例如動物界裡有脊索動物門（有脊椎的）和節肢動物門（有外骨骼的，像昆蟲和螃蟹）。', category: '第二層', categoryColor: 'orange' }},
            { id: 'class', emoji: '📊', label: '綱', info: { title: '綱', description: '同一門再分成幾個「綱」。例如脊索動物門裡有哺乳綱（哺乳動物）、鳥綱（鳥類）、爬蟲綱（蜥蜴、蛇）等等。', category: '第三層', categoryColor: 'amber' }},
            { id: 'order', emoji: '📁', label: '目', info: { title: '目', description: '哺乳綱裡面又分成很多「目」，例如食肉目（獅子、老虎、貓）、靈長目（人、猴子）。你和猴子都是靈長目的喔！', category: '第四層', categoryColor: 'green' }},
            { id: 'family', emoji: '👨‍👩‍👧‍👦', label: '科', info: { title: '科', description: '食肉目裡面又分成貓科（獅子、老虎、貓）、犬科（狗、狐狸、狼）。同一科的生物長得更像了。', category: '第五層', categoryColor: 'teal' }},
            { id: 'genus', emoji: '🏷️', label: '屬', info: { title: '屬', description: '貓科裡面又分成豹屬（獅子、老虎）和貓屬（家貓、野貓）。屬名就是學名的第一個字！', category: '第六層', categoryColor: 'blue' }},
            { id: 'species', emoji: '🎯', label: '種', info: { title: '種（最小）', description: '「種」是最小的分類單位。同一種的生物可以互相交配生出有生殖能力的後代。例如家貓就是一個種：Felis catus。口訣：界門綱目科屬種！', category: '最小', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '下列哪兩種生物的親緣關係最近？',
          options: [
            '(A) 同界不同門',
            '(B) 同門不同綱',
            '(C) 同綱不同目',
            '(D) 同屬不同種'
          ],
          correctIndex: 3,
          explanation: '分類階層越小，生物越相似、關係越近。同「屬」的生物比同「界」的生物關係近多了！就像同班同學比同校同學更熟一樣。'
        }
      },
      {
        id: 'concept5',
        title: '排出分類階層',
        interactionType: 'sequenceOrder',
        content: {
          title: '排出正確的分類階層',
          instruction: '把分類階層從大到小排列！',
          description: '剛剛學了七個分類層級，現在來挑戰排序吧！從最大的排到最小的。',
          items: [
            { id: 's1', text: '界', emoji: '🌍', detail: '最大的分類單位，如動物界、植物界' },
            { id: 's2', text: '門', emoji: '🚪', detail: '如脊索動物門、節肢動物門' },
            { id: 's3', text: '綱', emoji: '📊', detail: '如哺乳綱、鳥綱、爬蟲綱' },
            { id: 's4', text: '目', emoji: '📁', detail: '如食肉目、靈長目' },
            { id: 's5', text: '科', emoji: '👨‍👩‍👧‍👦', detail: '如貓科、犬科' },
            { id: 's6', text: '屬', emoji: '🏷️', detail: '學名的第一個字，如貓屬' },
            { id: 's7', text: '種', emoji: '🎯', detail: '最小的分類單位，如家貓' },
          ],
          completionMessage: '太棒了！記住口訣：「界門綱目科屬種」！越往下分類越細，同一組的生物也越相似。'
        },
        quiz: {
          question: '生物分類的七個階層，由大到小的正確順序為？',
          options: [
            '(A) 界門綱目科屬種',
            '(B) 種屬科目綱門界',
            '(C) 界門目綱科屬種',
            '(D) 界綱門目科種屬'
          ],
          correctIndex: 0,
          explanation: '口訣：「界門綱目科屬種」！越往下分類越細，同一組的生物也越相似。'
        }
      },
      {
        id: 'concept6',
        title: '五界分類',
        interactionType: 'clickExplore',
        content: {
          title: '認識生物的五大王國',
          instruction: '先來了解五界各有什麼特徵，等一下要挑戰分類遊戲！',
          sceneEmoji: '🌍',
          items: [
            { id: 'monera', emoji: '🦠', label: '原核生物界', info: { title: '原核生物界', description: '這些是最簡單的生物，細胞裡面沒有細胞核（DNA 沒有被膜包起來）。包括細菌和藍綠菌。它們超級小，要用顯微鏡才看得到，但數量非常非常多！', category: '原核', categoryColor: 'green' }},
            { id: 'protist', emoji: '🔬', label: '原生生物界', info: { title: '原生生物界', description: '有細胞核，但不屬於動物、植物或真菌的生物，通通放這裡。像草履蟲、變形蟲、矽藻、海帶都算。可以說是「不知道放哪裡就放這邊」的一群。', category: '原生', categoryColor: 'blue' }},
            { id: 'fungi', emoji: '🍄', label: '真菌界', info: { title: '真菌界', description: '真菌不是植物！它們沒有葉綠素，不會行光合作用，要靠分解其他東西來獲得營養。香菇、黴菌、酵母菌都是真菌。它們是大自然的「清潔工」，幫忙分解枯葉和腐爛的東西。', category: '真菌', categoryColor: 'amber' }},
            { id: 'plant', emoji: '🌿', label: '植物界', info: { title: '植物界', description: '植物有細胞壁、有葉綠素、會行光合作用。從小小的苔蘚到高大的大樹都是植物界的成員。植物是生態系的「生產者」，幫地球上其他生物製造食物和氧氣。', category: '植物', categoryColor: 'green' }},
            { id: 'animal', emoji: '🐾', label: '動物界', info: { title: '動物界', description: '動物沒有細胞壁、不會行光合作用，要靠吃其他生物來獲得營養。從小螞蟻到大鯨魚都是動物界。人類也是動物界的成員喔！', category: '動物', categoryColor: 'red' }},
          ]
        },
        quiz: {
          question: '下列何者是真菌界和植物界最大的差別？',
          options: [
            '(A) 有沒有細胞壁',
            '(B) 有沒有葉綠素、能否行光合作用',
            '(C) 是不是多細胞',
            '(D) 能不能移動'
          ],
          correctIndex: 1,
          explanation: '真菌和植物都有細胞壁、都不會動，看起來很像。但最大的差別是：植物有葉綠素會光合作用，真菌沒有，只能靠分解其他東西來獲得營養。'
        }
      },
      {
        id: 'concept7',
        title: '五界分類挑戰',
        interactionType: 'categorySort',
        content: {
          title: '把生物分到正確的界！',
          instruction: '運用剛才學到的知識，把每個生物拖到正確的分類箱裡！',
          categories: [
            { id: 'monera', name: '原核生物界', emoji: '🦠', color: 'green' },
            { id: 'protist', name: '原生生物界', emoji: '🔬', color: 'blue' },
            { id: 'fungi', name: '真菌界', emoji: '🍄', color: 'amber' },
            { id: 'plant', name: '植物界', emoji: '🌿', color: 'teal' },
            { id: 'animal', name: '動物界', emoji: '🐾', color: 'red' },
          ],
          items: [
            { id: 'i1', text: '大腸桿菌', emoji: '🧫', categoryId: 'monera', explanation: '大腸桿菌是細菌，沒有細胞核，屬於原核生物界' },
            { id: 'i2', text: '藍綠菌', emoji: '💚', categoryId: 'monera', explanation: '藍綠菌雖然會光合作用，但沒有細胞核，是原核生物' },
            { id: 'i3', text: '草履蟲', emoji: '🫧', categoryId: 'protist', explanation: '草履蟲是單細胞、有細胞核的原生動物' },
            { id: 'i4', text: '海帶', emoji: '🌊', categoryId: 'protist', explanation: '海帶是藻類，屬於原生生物界，不是植物' },
            { id: 'i5', text: '香菇', emoji: '🍄', categoryId: 'fungi', explanation: '香菇是蕈類，沒有葉綠素，靠分解有機物獲得營養' },
            { id: 'i6', text: '酵母菌', emoji: '🍞', categoryId: 'fungi', explanation: '酵母菌是單細胞真菌，用來做麵包和釀酒' },
            { id: 'i7', text: '玫瑰花', emoji: '🌹', categoryId: 'plant', explanation: '玫瑰是被子植物，有花有果實，屬於植物界' },
            { id: 'i8', text: '蕨類', emoji: '🌿', categoryId: 'plant', explanation: '蕨類有維管束、會光合作用，屬於植物界' },
            { id: 'i9', text: '老虎', emoji: '🐯', categoryId: 'animal', explanation: '老虎是哺乳動物，屬於動物界' },
            { id: 'i10', text: '蝴蝶', emoji: '🦋', categoryId: 'animal', explanation: '蝴蝶是昆蟲，屬於動物界節肢動物門' },
          ]
        },
        quiz: {
          question: '下列哪一種生物有細胞核但不會行光合作用，需要分解其他有機物來獲取養分？',
          options: [
            '(A) 藍綠菌',
            '(B) 蕨類',
            '(C) 香菇',
            '(D) 海帶'
          ],
          correctIndex: 2,
          explanation: '香菇是真菌界的成員，有細胞核但沒有葉綠素，不能光合作用，要靠分解腐爛的東西來獲得營養。藍綠菌是原核生物，蕨類是植物，海帶是原生生物（藻類）。'
        }
      },
      {
        id: 'concept8',
        title: '病毒',
        interactionType: 'virusExplore',
        content: {
          title: '五界以外的怪東西——病毒',
          instruction: '切換不同病毒類型，點擊各部位看圖解說明！還有繁殖過程動畫喔！',
          virusData: true,
          replicationSteps: [
            { emoji: '📌', title: '步驟一：附著', description: '病毒表面的蛋白質突起就像「鑰匙」，找到細胞表面匹配的「鎖」（受體），然後牢牢黏上去。不同病毒認不同的鎖，所以流感病毒只感染呼吸道細胞，不會感染腸胃細胞。', visual: '🦠 ➜ 🔑 + 🔒 ➜ 🏠' },
            { emoji: '💉', title: '步驟二：注入遺傳物質', description: '病毒把自己的 DNA 或 RNA 注入細胞裡面。有些病毒（像噬菌體）只注入遺傳物質，殼留在外面；有些病毒（像冠狀病毒）整個跑進細胞裡再脫殼。', visual: '🦠 ➜ 💉 ➜ 🧬進入細胞' },
            { emoji: '🏭', title: '步驟三：大量複製', description: '病毒的遺傳物質「騎劫」了細胞的工廠，強迫細胞停下自己的工作，改成瘋狂複製病毒的零件（遺傳物質 + 蛋白質外殼），然後組裝成數百個新病毒。', visual: '🧬 ➜ 🏭 ➜ 🦠🦠🦠🦠🦠' },
            { emoji: '💥', title: '步驟四：釋放（裂解）', description: '新病毒太多了，把細胞撐破（裂解）！數百個新病毒衝出來，各自去找新的細胞繼續感染。這就是為什麼感冒會越來越嚴重——病毒在你體內不斷倍增。', visual: '🏠💥 ➜ 🦠🦠🦠🦠 ➜ 感染更多細胞' },
          ],
          funFact: '病毒不屬於五界中的任何一界！因為它沒有細胞結構、不能獨立代謝、不能自行繁殖。但它有遺傳物質、會突變演化。科學家說病毒在「生物和非生物的邊界」，不算真正的生物。',
        },
        quiz: {
          question: '關於病毒，下列何者正確？',
          options: [
            '(A) 病毒有細胞結構',
            '(B) 病毒可以獨立繁殖',
            '(C) 病毒屬於原核生物界',
            '(D) 病毒必須寄生在活細胞中才能繁殖'
          ],
          correctIndex: 3,
          explanation: '病毒沒有細胞結構，不能自己產生能量或複製自己，必須跑進活細胞裡面「借用」細胞的工具來繁殖。它不屬於五界中的任何一界。'
        }
      },
      {
        id: 'concept9',
        title: '檢索表',
        interactionType: 'dichotomousKey',
        content: {
          title: '用檢索表辨認生物',
          instruction: '檢索表就像闖關遊戲，回答「是」或「否」就能找出未知生物！來試試看吧！',
          organisms: [
            {
              id: 'org1',
              name: '大腸桿菌',
              emoji: '🦠',
              keys: [
                { question: '有沒有細胞核？', answer: false },
              ]
            },
            {
              id: 'org2',
              name: '香菇',
              emoji: '🍄',
              keys: [
                { question: '有沒有細胞核？', answer: true },
                { question: '會不會自己製造食物（光合作用）？', answer: false },
                { question: '是不是動物（會移動、吃東西）？', answer: false },
              ]
            },
            {
              id: 'org3',
              name: '玫瑰',
              emoji: '🌹',
              keys: [
                { question: '有沒有細胞核？', answer: true },
                { question: '會不會自己製造食物（光合作用）？', answer: true },
                { question: '有沒有維管束？', answer: true },
                { question: '有沒有種子？', answer: true },
                { question: '有沒有花和果實？', answer: true },
              ]
            },
            {
              id: 'org4',
              name: '松樹',
              emoji: '🌲',
              keys: [
                { question: '有沒有細胞核？', answer: true },
                { question: '會不會自己製造食物（光合作用）？', answer: true },
                { question: '有沒有維管束？', answer: true },
                { question: '有沒有種子？', answer: true },
                { question: '有沒有花和果實？', answer: false },
              ]
            },
            {
              id: 'org5',
              name: '老鷹',
              emoji: '🦅',
              keys: [
                { question: '有沒有細胞核？', answer: true },
                { question: '會不會自己製造食物（光合作用）？', answer: false },
                { question: '是不是動物（會移動、吃東西）？', answer: true },
                { question: '有沒有脊椎？', answer: true },
                { question: '是不是恆溫動物？', answer: true },
                { question: '有沒有羽毛？', answer: true },
              ]
            },
          ]
        },
        quiz: {
          question: '關於檢索表，下列何者正確？',
          options: [
            '(A) 檢索表只能用來分類動物',
            '(B) 檢索表每個問題都有「是」和「否」兩條路',
            '(C) 使用檢索表前要先知道生物的名字',
            '(D) 檢索表只有科學家才能使用'
          ],
          correctIndex: 1,
          explanation: '檢索表的特色就是每一步都是二選一（是或否），根據答案走不同的路，最後就能辨認出生物的身分。任何人都可以使用，不需要先知道名字！'
        }
      }
    ]
  },
  {
    id: 'unit5',
    title: '3-3 原核、原生生物及真菌界',
    icon: '🔬',
    color: 'from-lime-400 to-green-500',
    concepts: [
      {
        id: 'concept1',
        title: '細菌長什麼樣？',
        interactionType: 'cellCompare',
        content: {
          title: '細菌 vs 動物細胞',
          instruction: '點擊每個標註，比較細菌和你學過的動物細胞有什麼不同！',
          referenceCell: { name: '動物細胞（你學過的）', type: 'animal' },
          targetCell: { name: '細菌（原核生物）', type: 'bacteria' },
          comparisons: [
            { id: 'nucleus', label: '細胞核', emoji: '🟣', reference: '有細胞核，DNA 被核膜包住保護', target: '沒有細胞核！DNA 像一團亂線散在細胞裡', highlight: 'difference', summary: '這是原核生物最大的特徵——沒有細胞核' },
            { id: 'size', label: '大小', emoji: '📏', reference: '直徑約 10~30 微米', target: '直徑只有 1~5 微米，比動物細胞小很多', highlight: 'difference', summary: '細菌比動物細胞小 5~10 倍，要用高倍顯微鏡才看得到' },
            { id: 'wall', label: '細胞壁', emoji: '🧱', reference: '沒有細胞壁，只有柔軟的細胞膜', target: '有堅硬的細胞壁，保護細菌', highlight: 'unique', summary: '細菌有細胞壁，動物細胞沒有' },
            { id: 'organelle', label: '胞器', emoji: '⚙️', reference: '有粒線體、內質網等各種胞器', target: '幾乎沒有胞器，構造非常簡單', highlight: 'difference', summary: '細菌的內部構造比動物細胞簡單非常多' },
            { id: 'flagella', label: '鞭毛', emoji: '〰️', reference: '通常沒有鞭毛', target: '有些細菌有鞭毛，可以游泳移動', highlight: 'unique', summary: '鞭毛像小尾巴，幫助細菌在液體中移動' },
            { id: 'cyanobacteria', label: '藍綠菌', emoji: '💚', reference: '不會光合作用（動物細胞）', target: '藍綠菌也是原核生物，但能行光合作用！是地球上最早的產氧者', highlight: 'unique', summary: '藍綠菌雖叫「藍綠藻」但沒有細胞核，是原核生物不是藻類' },
          ],
          funFact: '你的身體裡有幾兆個細菌，數量比你自己的細胞還多！大部分都是好菌，幫你消化食物。優格裡的乳酸菌也是細菌（原核生物），不是真菌喔！'
        },
        quiz: {
          question: '下列關於原核生物的敘述何者正確？',
          options: [
            '(A) 原核生物都會讓人生病',
            '(B) 藍綠菌有細胞核，屬於藻類',
            '(C) 原核生物的細胞沒有細胞核',
            '(D) 細菌只有一種形狀'
          ],
          correctIndex: 2,
          explanation: '原核生物最大的特徵就是沒有細胞核，DNA 直接散在細胞質裡。藍綠菌雖然叫「藍綠藻」，但它沒有細胞核，是原核生物不是藻類。'
        }
      },
      {
        id: 'concept2',
        title: '原生生物長什麼樣？',
        interactionType: 'cellCompare',
        content: {
          title: '原生動物 vs 動物細胞',
          instruction: '原生生物有細胞核，但跟動物細胞又不太一樣。點擊比較看看！',
          referenceCell: { name: '動物細胞', type: 'animal' },
          targetCell: { name: '變形蟲（原生動物）', type: 'protist' },
          comparisons: [
            { id: 'nucleus', label: '細胞核', emoji: '🟣', reference: '有細胞核', target: '也有細胞核！比細菌更進化', highlight: 'similar', summary: '原生生物和動物細胞一樣有細胞核，這是跟細菌最大的不同' },
            { id: 'shape', label: '外型', emoji: '🫧', reference: '形狀比較固定', target: '變形蟲會不斷改變形狀，伸出「假足」', highlight: 'difference', summary: '變形蟲沒有固定形狀，會伸出假足來移動和捕食' },
            { id: 'food', label: '食物泡', emoji: '🔵', reference: '沒有食物泡', target: '有食物泡，用來消化吃進來的食物', highlight: 'unique', summary: '變形蟲用假足把食物包起來，形成食物泡再慢慢消化' },
            { id: 'single', label: '單細胞', emoji: '1️⃣', reference: '多細胞生物的其中一個細胞', target: '整個生物就只有一個細胞！', highlight: 'difference', summary: '原生動物用一個細胞完成所有生命功能：吃、呼吸、排泄、繁殖' },
            { id: 'types', label: '原生生物三大類', emoji: '📊', reference: '—', target: '原生動物（像動物）、藻類（像植物）、原生菌類（像真菌）', highlight: 'unique', summary: '原生生物界很多樣：有像動物的、像植物的、像真菌的' },
            { id: 'euglena', label: '眼蟲', emoji: '👁️', reference: '動物不會光合作用', target: '眼蟲超特別——有葉綠素會光合作用，但也會運動吃東西，同時像動物又像植物！', highlight: 'unique', summary: '眼蟲是原生生物界最特殊的例子，同時有動物和植物的特性' },
          ],
          funFact: '黏菌（原生菌類）雖然沒有腦，卻能找到迷宮的最短路線！科學家用它來設計城市交通路線。'
        },
        quiz: {
          question: '下列哪一種生物有細胞核、會行光合作用，但不屬於植物界？',
          options: [
            '(A) 細菌',
            '(B) 藍綠菌',
            '(C) 海帶',
            '(D) 香菇'
          ],
          correctIndex: 2,
          explanation: '海帶是藻類，屬於原生生物界。它有細胞核、有葉綠素、會光合作用，但構造比植物簡單，沒有真正的根莖葉，所以不算植物。'
        }
      },
      {
        id: 'concept3',
        title: '原生生物分類挑戰',
        interactionType: 'categorySort',
        content: {
          title: '原生生物分三大類！',
          instruction: '學了原生生物的三大類，現在把它們分到正確的類別吧！',
          categories: [
            { id: 'protozoa', name: '原生動物', emoji: '🫧', color: 'blue' },
            { id: 'algae', name: '藻類', emoji: '🌊', color: 'green' },
            { id: 'slime', name: '原生菌類', emoji: '🟡', color: 'amber' },
          ],
          items: [
            { id: 'i1', text: '草履蟲', emoji: '🫧', categoryId: 'protozoa', explanation: '草履蟲用纖毛游泳、自己找食物吃，像動物一樣' },
            { id: 'i2', text: '變形蟲', emoji: '🔵', categoryId: 'protozoa', explanation: '變形蟲會伸出假足爬行和包住食物' },
            { id: 'i3', text: '瘧原蟲', emoji: '🦟', categoryId: 'protozoa', explanation: '瘧原蟲會讓人生病（瘧疾），是原生動物的一種' },
            { id: 'i4', text: '矽藻', emoji: '💎', categoryId: 'algae', explanation: '矽藻是單細胞藻類，細胞壁含矽，像住在玻璃屋裡' },
            { id: 'i5', text: '海帶', emoji: '🌊', categoryId: 'algae', explanation: '海帶是多細胞藻類，有葉綠素會光合作用' },
            { id: 'i6', text: '綠藻', emoji: '💚', categoryId: 'algae', explanation: '綠藻是常見的藻類，跟植物親緣關係最近' },
            { id: 'i7', text: '黏菌', emoji: '🟡', categoryId: 'slime', explanation: '黏菌有時像動物會爬行，有時又會長出孢子像真菌' },
            { id: 'i8', text: '水黴菌', emoji: '🟤', categoryId: 'slime', explanation: '水黴菌看起來像真菌，但構造不同，是原生菌類' },
          ]
        },
        quiz: {
          question: '原生生物界的三大類，下列配對何者正確？',
          options: [
            '(A) 草履蟲——藻類',
            '(B) 海帶——原生動物',
            '(C) 黏菌——原生菌類',
            '(D) 矽藻——原生菌類'
          ],
          correctIndex: 2,
          explanation: '黏菌是原生菌類（有時像動物、有時像真菌）。草履蟲是原生動物，海帶和矽藻都是藻類。'
        }
      },
      {
        id: 'concept4',
        title: '真菌跟植物有什麼不同？',
        interactionType: 'cellCompare',
        content: {
          title: '真菌 vs 植物細胞',
          instruction: '真菌看起來很像植物，但其實差很多！點擊比較看看。',
          referenceCell: { name: '植物細胞（你學過的）', type: 'plant' },
          targetCell: { name: '真菌細胞', type: 'fungi' },
          comparisons: [
            { id: 'wall', label: '細胞壁材質', emoji: '🧱', reference: '細胞壁是「纖維素」做的', target: '細胞壁是「幾丁質」做的（跟昆蟲外殼一樣！）', highlight: 'difference', summary: '雖然都有細胞壁，但材質完全不同！真菌的是幾丁質，植物的是纖維素' },
            { id: 'chloro', label: '葉綠素', emoji: '💚', reference: '有葉綠體，含有葉綠素，能行光合作用', target: '完全沒有葉綠體！不能光合作用', highlight: 'difference', summary: '這是最關鍵的差別——真菌沒有葉綠素，不能自己製造食物' },
            { id: 'nutrition', label: '營養方式', emoji: '🍽️', reference: '自營：用光合作用自己製造食物', target: '異營：靠分解其他有機物（腐爛的東西）獲取營養', highlight: 'difference', summary: '植物自己做飯（光合作用），真菌吃別人的剩飯（分解有機物）' },
            { id: 'vacuole', label: '液泡', emoji: '💧', reference: '有很大的中央液泡', target: '液泡較小', highlight: 'difference', summary: '植物有巨大的中央液泡儲存水分，真菌的液泡比較小' },
            { id: 'nucleus', label: '細胞核', emoji: '🟣', reference: '有細胞核', target: '也有細胞核', highlight: 'similar', summary: '真菌和植物都有細胞核，都是真核生物' },
          ],
          funFact: '世界上最大的生物是一株蜜環菌（真菌），它的菌絲網在地底下蔓延了 9.6 平方公里，比一千個足球場還大！'
        },
        quiz: {
          question: '下列關於真菌的敘述何者錯誤？',
          options: [
            '(A) 真菌有葉綠素，可以行光合作用',
            '(B) 酵母菌是單細胞真菌',
            '(C) 青黴素是從黴菌提煉的抗生素',
            '(D) 真菌在生態系中扮演分解者角色'
          ],
          correctIndex: 0,
          explanation: '真菌沒有葉綠素，不會光合作用！它是靠分解其他有機物來獲得營養的。'
        }
      },
      {
        id: 'concept5',
        title: '真菌配對挑戰',
        interactionType: 'matchingPairs',
        content: {
          title: '配對真菌和它的特徵',
          instruction: '認識了真菌的特色，來挑戰配對吧！',
          leftLabel: '真菌',
          rightLabel: '特徵',
          pairs: [
            { id: 'p1', left: { text: '酵母菌', emoji: '🍞' }, right: { text: '單細胞、出芽生殖', emoji: '🔬' }, explanation: '酵母菌是最簡單的真菌，只有一個細胞，用出芽的方式繁殖' },
            { id: 'p2', left: { text: '青黴菌', emoji: '🟢' }, right: { text: '提煉出抗生素', emoji: '💊' }, explanation: '青黴素（盤尼西林）就是從青黴菌提煉出來的，救了無數人的命' },
            { id: 'p3', left: { text: '香菇', emoji: '🍄' }, right: { text: '蕈類、有子實體', emoji: '🌂' }, explanation: '我們吃的香菇是子實體，真正的身體是土裡的菌絲' },
            { id: 'p4', left: { text: '木耳', emoji: '🖤' }, right: { text: '長在枯木上', emoji: '🪵' }, explanation: '木耳是蕈類的一種，生長在枯木或倒木上，幫忙分解木頭' },
            { id: 'p5', left: { text: '麵包黴', emoji: '🫓' }, right: { text: '菌絲深入食物', emoji: '🕸️' }, explanation: '麵包放太久長出的毛毛就是黴菌，菌絲會深入食物裡分解營養' },
          ]
        },
        quiz: {
          question: '下列哪一種真菌是單細胞生物？',
          options: [
            '(A) 香菇',
            '(B) 酵母菌',
            '(C) 青黴菌',
            '(D) 木耳'
          ],
          correctIndex: 1,
          explanation: '酵母菌是唯一常見的單細胞真菌。香菇、木耳是蕈類（多細胞），青黴菌是黴菌（多細胞菌絲體）。'
        }
      },
      {
        id: 'concept6',
        title: '微生物生態角色',
        interactionType: 'categorySort',
        content: {
          title: '微生物扮演什麼角色？',
          instruction: '微生物在自然界中扮演不同角色。「生產者」自己製造食物、「分解者」分解死掉的東西、「互利共生」跟其他生物互相幫助、「致病者」會讓人生病。把每個微生物拖到正確的角色！',
          categories: [
            { id: 'producer', name: '生產者（自己製造食物）', emoji: '🌱', color: 'green' },
            { id: 'decomposer', name: '分解者（分解腐爛物質）', emoji: '♻️', color: 'amber' },
            { id: 'symbiosis', name: '互利共生（跟其他生物合作）', emoji: '🤝', color: 'blue' },
            { id: 'pathogen', name: '致病者（讓人生病）', emoji: '⚠️', color: 'red' },
          ],
          items: [
            { id: 'i1', text: '矽藻', emoji: '💎', categoryId: 'producer', explanation: '矽藻行光合作用，是海洋食物鏈的基礎，提供地球一半以上的氧氣' },
            { id: 'i2', text: '綠藻', emoji: '💚', categoryId: 'producer', explanation: '綠藻有葉綠素，行光合作用製造有機物和氧氣' },
            { id: 'i3', text: '腐生細菌', emoji: '🧫', categoryId: 'decomposer', explanation: '腐生細菌分解死掉的動植物，把養分還給土壤' },
            { id: 'i4', text: '黴菌', emoji: '🟢', categoryId: 'decomposer', explanation: '黴菌分解枯葉和腐爛的東西，是重要的分解者' },
            { id: 'i5', text: '根瘤菌', emoji: '🫘', categoryId: 'symbiosis', explanation: '根瘤菌住在豆科植物根裡，幫植物把空氣中的氮變成養分' },
            { id: 'i6', text: '腸道益生菌', emoji: '🧑', categoryId: 'symbiosis', explanation: '腸道益生菌幫你消化食物、製造維生素、對抗壞菌' },
            { id: 'i7', text: '肺結核桿菌', emoji: '😷', categoryId: 'pathogen', explanation: '肺結核桿菌感染肺部，造成肺結核病' },
            { id: 'i8', text: '瘧原蟲', emoji: '🦟', categoryId: 'pathogen', explanation: '瘧原蟲通過蚊子傳播，造成瘧疾' },
          ]
        },
        quiz: {
          question: '下列關於微生物在生態系中角色的敘述何者錯誤？',
          options: [
            '(A) 藻類是海洋中重要的生產者',
            '(B) 細菌和真菌可以分解有機物',
            '(C) 所有微生物都對人體有害',
            '(D) 根瘤菌能幫助植物獲得氮肥'
          ],
          correctIndex: 2,
          explanation: '大部分微生物對人體是無害甚至有益的！腸道裡的益生菌幫助消化，根瘤菌幫植物固氮。只有少數微生物會讓人生病。'
        }
      }
    ]
  },
  {
    id: 'unit6',
    title: '3-4 植物界',
    icon: '🌿',
    color: 'from-emerald-400 to-green-600',
    concepts: [
      {
        id: 'concept1',
        title: '植物細胞 vs 動物細胞',
        interactionType: 'cellCompare',
        content: {
          title: '植物細胞 vs 動物細胞',
          instruction: '植物細胞跟動物細胞長得不一樣！點擊比較看看有什麼差別。',
          referenceCell: { name: '動物細胞', type: 'animal' },
          targetCell: { name: '植物細胞', type: 'plant' },
          comparisons: [
            { id: 'wall', label: '細胞壁', emoji: '🧱', reference: '沒有細胞壁', target: '有堅硬的纖維素細胞壁，在細胞膜外面', highlight: 'unique', summary: '細胞壁讓植物細胞有固定形狀，也讓植物能挺立生長' },
            { id: 'chloro', label: '葉綠體', emoji: '💚', reference: '沒有葉綠體', target: '有葉綠體，裡面含有葉綠素，能行光合作用', highlight: 'unique', summary: '葉綠體是植物最重要的特徵——讓植物能用陽光製造食物' },
            { id: 'vacuole', label: '中央液泡', emoji: '💧', reference: '液泡很小或沒有', target: '有一個超大的中央液泡，佔細胞大部分空間', highlight: 'difference', summary: '中央液泡儲存水分和養分，也幫助維持細胞的形狀' },
            { id: 'nucleus', label: '細胞核', emoji: '🟣', reference: '有細胞核，位在中央', target: '有細胞核，被液泡擠到旁邊', highlight: 'similar', summary: '都有細胞核，但植物細胞的核被大液泡推到邊邊去了' },
            { id: 'mito', label: '粒線體', emoji: '🟠', reference: '有粒線體，產生能量', target: '也有粒線體，產生能量', highlight: 'similar', summary: '動物和植物細胞都有粒線體來產生能量' },
          ],
          funFact: '植物細胞的三大特徵：細胞壁 + 葉綠體 + 大液泡。記住這三個，就能分辨植物和動物細胞了！'
        },
        quiz: {
          question: '下列何者是植物細胞有但動物細胞沒有的構造？',
          options: [
            '(A) 細胞核',
            '(B) 粒線體',
            '(C) 細胞壁和葉綠體',
            '(D) 細胞膜'
          ],
          correctIndex: 2,
          explanation: '細胞壁和葉綠體是植物細胞的專屬構造。細胞核、粒線體、細胞膜則是動物和植物細胞都有的。'
        }
      },
      {
        id: 'concept2',
        title: '植物的四大分類（圖解）',
        interactionType: 'plantIllustration',
        content: {
          title: '植物界的四大家族',
          instruction: '切換不同植物類型，點擊各部位看圖解說明！每種植物長什麼樣子、有什麼構造，一目了然。',
        },
        quiz: {
          question: '下列何者不是植物界的共同特徵？',
          options: [
            '(A) 多細胞',
            '(B) 有細胞壁',
            '(C) 有維管束',
            '(D) 能行光合作用'
          ],
          correctIndex: 2,
          explanation: '不是所有植物都有維管束！蘚苔植物就沒有維管束，所以長不高。多細胞、有細胞壁、會光合作用才是所有植物的共同特徵。'
        }
      },
      {
        id: 'concept3',
        title: '蘚苔 vs 蕨類',
        interactionType: 'categorySort',
        content: {
          title: '蘚苔和蕨類誰有什麼？',
          instruction: '蘚苔和蕨類都用孢子繁殖，但構造差很多！把每個特徵拖到正確的植物類別。小知識：「孢蒴」是蘚苔頂端像小火柴棒的構造，裡面裝著孢子，成熟後彈開散播。「孢子囊堆」是蕨類葉子背面的褐色小圓點，裡面也裝著孢子。',
          categories: [
            { id: 'moss', name: '蘚苔植物', emoji: '🌱', color: 'green' },
            { id: 'fern', name: '蕨類植物', emoji: '🌿', color: 'teal' },
          ],
          items: [
            { id: 'i1', text: '沒有維管束', emoji: '❌', categoryId: 'moss', explanation: '蘚苔沒有維管束（水管系統），水分只能靠細胞慢慢傳，所以長不高' },
            { id: 'i2', text: '有維管束', emoji: '✅', categoryId: 'fern', explanation: '蕨類有維管束，可以高效運水和養分，所以能長很高' },
            { id: 'i3', text: '只有假根（固定用）', emoji: '〰️', categoryId: 'moss', explanation: '蘚苔的假根只能固定在地面，不能真正吸水，靠整個身體表面吸水' },
            { id: 'i4', text: '有真正的根莖葉', emoji: '🌿', categoryId: 'fern', explanation: '蕨類有真正的根（吸水）、莖（輸送）、葉（光合作用），構造比蘚苔完整' },
            { id: 'i5', text: '葉背有孢子囊堆', emoji: '🟤', categoryId: 'fern', explanation: '蕨類葉子背面的褐色小圓點就是孢子囊堆，裡面裝滿孢子，不是蟲卵喔！' },
            { id: 'i6', text: '有孢蒴（像小火柴棒）', emoji: '📍', categoryId: 'moss', explanation: '蘚苔頂端會長出像小火柴棒的「孢蒴」，裡面裝著孢子，成熟後彈開散播' },
            { id: 'i7', text: '個體矮小（幾公分）', emoji: '📏', categoryId: 'moss', explanation: '因為沒有維管束，水分傳遞靠擴散，所以蘚苔只能長幾公分高' },
            { id: 'i8', text: '可以長到好幾公尺', emoji: '🌲', categoryId: 'fern', explanation: '有了維管束的幫助，蕨類可以長很高，像筆筒樹就有好幾公尺！' },
          ]
        },
        quiz: {
          question: '蕨類植物和蘚苔植物最主要的差異是？',
          options: [
            '(A) 蕨類有種子，蘚苔沒有',
            '(B) 蕨類有維管束，蘚苔沒有',
            '(C) 蕨類會開花，蘚苔不會',
            '(D) 蕨類不需要水就能受精'
          ],
          correctIndex: 1,
          explanation: '蕨類最大的進步就是有了維管束！但蕨類還是沒有種子、不會開花，精子仍然需要水才能受精。'
        }
      },
      {
        id: 'concept4',
        title: '裸子與被子教學',
        interactionType: 'clickExplore',
        content: {
          title: '種子植物的兩大類',
          instruction: '點擊了解裸子和被子植物的差異，等一下要挑戰分類！',
          sceneEmoji: '🌳',
          items: [
            { id: 'gymno', emoji: '🌲', label: '裸子植物', info: { title: '裸子植物', description: '有種子但種子「裸露」，沒有果實包住。大部分種子藏在毬果裡（像松果）。不會開花，靠風傳粉。常見：松樹、柏樹、杉木、銀杏、蘇鐵。', category: '裸子植物', categoryColor: 'green' }},
            { id: 'angio', emoji: '🌸', label: '被子植物', info: { title: '被子植物', description: '最進化的植物！有花（負責繁殖）和果實（保護種子、幫助散播）。靠風或動物傳粉。是地球上種類最多的植物。常見：玫瑰、稻米、蘋果、向日葵。', category: '被子植物', categoryColor: 'pink' }},
            { id: 'mono', emoji: '🌾', label: '單子葉植物', info: { title: '被子植物——單子葉', description: '種子有一片子葉。特徵：葉脈平行、花瓣 3 的倍數、莖內維管束散生。常見：稻米、小麥、玉米、竹子、百合、蘭花。', category: '被子植物', categoryColor: 'amber' }},
            { id: 'di', emoji: '🌻', label: '雙子葉植物', info: { title: '被子植物——雙子葉', description: '種子有兩片子葉。特徵：葉脈網狀、花瓣 4 或 5 的倍數、莖內維管束排成環狀。常見：玫瑰、向日葵、豆類、蘋果樹。', category: '被子植物', categoryColor: 'blue' }},
            { id: 'no_water', emoji: '🌬️', label: '不再需要水', info: { title: '種子植物的大進步', description: '種子植物不需要水來幫精子游泳了！花粉靠風或動物傳送。這讓種子植物可以住在乾燥的地方，征服了整個陸地！這是比蕨類更進化的關鍵。', category: '演化意義', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '下列何者是單子葉和雙子葉植物的差異？',
          options: [
            '(A) 單子葉有種子，雙子葉沒有',
            '(B) 單子葉葉脈平行，雙子葉葉脈網狀',
            '(C) 單子葉沒有花，雙子葉有花',
            '(D) 單子葉是裸子植物，雙子葉是被子植物'
          ],
          correctIndex: 1,
          explanation: '單子葉和雙子葉都是被子植物（都有花）。最容易分辨的特徵：單子葉的葉脈是平行的（像稻葉），雙子葉的葉脈是網狀的（像楓葉）。'
        }
      },
      {
        id: 'concept5',
        title: '種子植物的繁殖',
        interactionType: 'clickExplore',
        content: {
          title: '種子植物怎麼繁殖？',
          instruction: '點擊每個項目，了解種子植物如何不靠水就能繁殖後代！',
          sceneEmoji: '🌸',
          items: [
            { id: 'pollen_tube', emoji: '🌾', label: '花粉管', info: { title: '花粉管——不需要水的秘密武器', description: '花粉落在柱頭上之後，會長出一條長長的「花粉管」，像一條隧道一樣，讓精細胞通過花粉管到達胚珠，完成受精。這樣就不需要水來幫精子游泳了！這是種子植物比蕨類更厲害的地方。', category: '繁殖構造', categoryColor: 'amber' }},
            { id: 'ovule_seed', emoji: '🌰', label: '胚珠→種子', info: { title: '胚珠發育成種子', description: '受精之後，胚珠（裡面有受精卵）會慢慢發育成種子。種子裡面有小小的胚（未來的新植物）和養分，就像一個「植物寶寶的便當盒」，讓小植物有足夠的營養發芽長大。', category: '發育過程', categoryColor: 'green' }},
            { id: 'ovary_fruit', emoji: '🍎', label: '子房→果實', info: { title: '子房發育成果實', description: '受精後，包在胚珠外面的子房會發育成果實。果實的功能是保護種子，還能幫助種子散播——有些果實好吃讓動物吃掉幫忙帶走種子，有些果實有翅膀可以飛。記住：是子房變果實，不是花粉管變果實喔！', category: '發育過程', categoryColor: 'red' }},
            { id: 'cones', emoji: '🌲', label: '雌雄毬果', info: { title: '裸子植物的毬果', description: '裸子植物沒有花，但有毬果！雌毬果上有胚珠（等待受精），雄毬果會產生花粉（隨風飄散）。雌毬果和雄毬果不一定在同一棵樹上。松果就是雌毬果，裡面有種子，但沒有果實包住（所以叫裸子）。', category: '裸子植物', categoryColor: 'teal' }},
            { id: 'why_dominate', emoji: '👑', label: '種子植物稱霸的原因', info: { title: '為什麼種子植物能稱霸陸地？', description: '兩個關鍵：第一，花粉管讓受精不再需要水，所以乾燥的地方也能繁殖。第二，種子有堅硬的外殼和養分，可以撐過惡劣環境等待好時機發芽。不像孢子那麼脆弱。有了這兩大武器，種子植物就征服了整個陸地！', category: '演化意義', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '受精後，下列何者會發育為果實？',
          options: [
            '(A) 花粉管',
            '(B) 柱頭',
            '(C) 子房',
            '(D) 花瓣'
          ],
          correctIndex: 2,
          explanation: '受精後，子房會發育成果實，胚珠會發育成種子。花粉管只是讓精細胞通過的通道，完成任務後就不會再發育了。記住：子房→果實，胚珠→種子！'
        }
      },
      {
        id: 'concept6',
        title: '單子葉 vs 雙子葉',
        interactionType: 'matchingPairs',
        content: {
          title: '單子葉和雙子葉配對',
          instruction: '把每個特徵拖到正確的植物類別！記住這些特徵，考試很愛考喔！',
          leftLabel: '特徵',
          rightLabel: '植物類別',
          pairs: [
            { id: 'p1', left: { text: '葉脈平行', emoji: '📏' }, right: { text: '單子葉', emoji: '🌾' }, explanation: '單子葉植物的葉脈是平行排列的，像稻葉、竹葉' },
            { id: 'p2', left: { text: '葉脈網狀', emoji: '🕸️' }, right: { text: '雙子葉', emoji: '🌻' }, explanation: '雙子葉植物的葉脈像網子一樣交錯，像楓葉、玫瑰葉' },
            { id: 'p3', left: { text: '花瓣3的倍數', emoji: '3️⃣' }, right: { text: '單子葉', emoji: '🌾' }, explanation: '單子葉植物的花瓣數是3的倍數（3、6、9片），像百合花有6片花瓣' },
            { id: 'p4', left: { text: '花瓣4或5的倍數', emoji: '5️⃣' }, right: { text: '雙子葉', emoji: '🌻' }, explanation: '雙子葉植物的花瓣數是4或5的倍數，像玫瑰花有5片花瓣' },
            { id: 'p5', left: { text: '有形成層', emoji: '🔄' }, right: { text: '雙子葉', emoji: '🌻' }, explanation: '雙子葉植物的莖有形成層，可以不斷加粗長大，所以大樹幾乎都是雙子葉' },
            { id: 'p6', left: { text: '維管束散生', emoji: '🔵' }, right: { text: '單子葉', emoji: '🌾' }, explanation: '單子葉植物的維管束像撒芝麻一樣散布在莖裡面，沒有排成環狀' },
          ]
        },
        quiz: {
          question: '形成層是哪類植物特有的構造？',
          options: [
            '(A) 蘚苔植物',
            '(B) 蕨類植物',
            '(C) 單子葉植物',
            '(D) 雙子葉植物'
          ],
          correctIndex: 3,
          explanation: '形成層是雙子葉植物特有的！形成層可以讓莖不斷加粗，所以能長成大樹。單子葉植物沒有形成層，維管束散生在莖裡面，所以竹子的莖不會越長越粗。'
        }
      },
      {
        id: 'concept7',
        title: '植物特徵總整理',
        interactionType: 'clickExplore',
        content: {
          title: '四大類植物特徵總表',
          instruction: '點擊每一類植物，複習它們有什麼、沒什麼！這是考前最重要的總整理！',
          sceneEmoji: '📊',
          items: [
            { id: 'summary_moss', emoji: '🌱', label: '蘚苔植物', info: { title: '🌱 蘚苔植物特徵總整理', description: '✅ 有：細胞壁、葉綠素、孢子、假根、孢蒴\n❌ 沒有：維管束、真正的根莖葉、種子、花、果實\n🔑 關鍵：沒有維管束 → 長不高（幾公分）；精子需要水游泳\n📝 代表：土馬騌、地錢、泥炭蘚', category: '無維管束植物', categoryColor: 'green' }},
            { id: 'summary_fern', emoji: '🌿', label: '蕨類植物', info: { title: '🌿 蕨類植物特徵總整理', description: '✅ 有：細胞壁、葉綠素、孢子、維管束、真正的根莖葉、孢子囊堆（在葉背）\n❌ 沒有：種子、花、果實\n🔑 關鍵：有維管束 → 可以長高；但精子仍需要水游泳\n📝 代表：筆筒樹、腎蕨、鳥巢蕨、山蘇', category: '有維管束、無種子', categoryColor: 'teal' }},
            { id: 'summary_gymno', emoji: '🌲', label: '裸子植物', info: { title: '🌲 裸子植物特徵總整理', description: '✅ 有：細胞壁、葉綠素、維管束、根莖葉、種子、花粉、毬果\n❌ 沒有：花、果實（種子裸露）\n🔑 關鍵：有花粉管 → 不需要水受精；種子在毬果裡但沒有果實包住\n📝 代表：松樹、柏樹、銀杏、蘇鐵', category: '有種子、無花果', categoryColor: 'amber' }},
            { id: 'summary_angio', emoji: '🌸', label: '被子植物', info: { title: '🌸 被子植物特徵總整理', description: '✅ 有：細胞壁、葉綠素、維管束、根莖葉、種子、花粉、花、果實\n❌ 全部都有！是最完整的植物\n🔑 關鍵：有花吸引動物傳粉（效率高）；果實保護種子並幫助散播\n📝 代表：玫瑰、稻米、向日葵、蘋果、竹子', category: '有花有果實', categoryColor: 'pink' }},
            { id: 'summary_evolution', emoji: '📈', label: '演化順序記憶法', info: { title: '📈 演化順序與關鍵突破', description: '蘚苔 → 蕨類 → 裸子 → 被子\n\n每一步的關鍵突破：\n🌱→🌿 獲得「維管束」→ 可以長高\n🌿→🌲 獲得「種子＋花粉管」→ 不靠水繁殖\n🌲→🌸 獲得「花＋果實」→ 更有效傳粉和散播\n\n口訣：「苔蕨裸被，管種花果」\n（蘚苔→蕨類得到管，裸子得到種，被子得到花和果）', category: '總整理', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '下列哪一類植物有維管束但沒有種子？',
          options: [
            '(A) 蘚苔植物',
            '(B) 蕨類植物',
            '(C) 裸子植物',
            '(D) 被子植物'
          ],
          correctIndex: 1,
          explanation: '蕨類植物有維管束（所以能長高），但還沒有種子（用孢子繁殖）。蘚苔沒有維管束也沒有種子；裸子和被子都有維管束也有種子。'
        }
      },
      {
        id: 'concept8',
        title: '植物分類大挑戰',
        interactionType: 'categorySort',
        content: {
          title: '把植物分到正確的類別！',
          instruction: '運用所有學到的知識，把每種植物拖到正確的分類箱！',
          categories: [
            { id: 'bryophyte', name: '蘚苔植物', emoji: '🌱', color: 'green' },
            { id: 'fern', name: '蕨類植物', emoji: '🌿', color: 'teal' },
            { id: 'gymnosperm', name: '裸子植物', emoji: '🌲', color: 'amber' },
            { id: 'angiosperm', name: '被子植物', emoji: '🌸', color: 'pink' },
          ],
          items: [
            { id: 'i1', text: '土馬騌', emoji: '🌱', categoryId: 'bryophyte', explanation: '土馬騌是蘚苔植物，沒有維管束，用孢子繁殖' },
            { id: 'i2', text: '地錢', emoji: '💧', categoryId: 'bryophyte', explanation: '地錢是蘚苔植物，扁平狀貼在潮濕地面生長，沒有維管束' },
            { id: 'i3', text: '筆筒樹', emoji: '🌿', categoryId: 'fern', explanation: '筆筒樹是台灣常見的樹蕨，有維管束但沒種子' },
            { id: 'i4', text: '鳥巢蕨', emoji: '🍃', categoryId: 'fern', explanation: '鳥巢蕨（山蘇）常見於森林中，有維管束，葉子背面有孢子囊堆' },
            { id: 'i5', text: '松樹', emoji: '🌲', categoryId: 'gymnosperm', explanation: '松樹是裸子植物，種子在毬果裡，沒有花和果實' },
            { id: 'i6', text: '銀杏', emoji: '🍂', categoryId: 'gymnosperm', explanation: '銀杏是活化石也是裸子植物，種子裸露沒有果實包住' },
            { id: 'i7', text: '玫瑰', emoji: '🌹', categoryId: 'angiosperm', explanation: '玫瑰是被子植物（雙子葉），有花有果實' },
            { id: 'i8', text: '稻米', emoji: '🌾', categoryId: 'angiosperm', explanation: '稻米是被子植物（單子葉），葉脈平行' },
            { id: 'i9', text: '蘇鐵', emoji: '🌴', categoryId: 'gymnosperm', explanation: '蘇鐵是裸子植物，外型像棕櫚但其實是裸子植物，不會開花' },
            { id: 'i10', text: '大王椰子', emoji: '🌻', categoryId: 'angiosperm', explanation: '大王椰子是被子植物（單子葉），雖然看起來像棕櫚樹，但會開花結果' },
          ]
        },
        quiz: {
          question: '下列何者是裸子植物和被子植物最主要的差異？',
          options: [
            '(A) 裸子植物沒有維管束',
            '(B) 被子植物用孢子繁殖',
            '(C) 被子植物有花和果實，裸子植物沒有',
            '(D) 裸子植物的種子被果實包住'
          ],
          correctIndex: 2,
          explanation: '最大的差異就是被子植物有花和果實，裸子植物沒有。兩者都有維管束和種子。'
        }
      }
    ]
  }
];
