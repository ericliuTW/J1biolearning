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
          ],
          categories: ['遺骸化石', '遺跡化石', '活化石']
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
          instruction: '點擊每個例子，看看俗名和學名有什麼不同！',
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
        title: '分類的七個階層',
        interactionType: 'stepProcess',
        content: {
          title: '生物分類的七個層級',
          steps: [
            { emoji: '🌍', visual: '界', title: '界（最大）', description: '「界」是最大的分類，就像把所有生物分成幾個超大的家族。目前分成五界：原核生物界、原生生物界、真菌界、植物界、動物界。', actionText: '下一層', resultText: '界：最大的分類單位' },
            { emoji: '🚪', visual: '門', title: '門', description: '同一界裡面再細分成幾個「門」。例如動物界裡有脊索動物門（有脊椎的）和節肢動物門（有外骨骼的，像昆蟲和螃蟹）。', actionText: '下一層', resultText: '門：把同一界的生物再分組' },
            { emoji: '📊', visual: '綱', title: '綱', description: '同一門再分成幾個「綱」。例如脊索動物門裡有哺乳綱（哺乳動物）、鳥綱（鳥類）、爬蟲綱（蜥蜴、蛇）等等。', actionText: '下一層', resultText: '綱：繼續細分' },
            { emoji: '📁', visual: '目', title: '目', description: '哺乳綱裡面又分成很多「目」，例如食肉目（獅子、老虎、貓）、靈長目（人、猴子）。你和猴子都是靈長目的喔！', actionText: '下一層', resultText: '目：更細的分類' },
            { emoji: '👨‍👩‍👧‍👦', visual: '科', title: '科', description: '食肉目裡面又分成貓科（獅子、老虎、貓）、犬科（狗、狐狸、狼）。同一科的生物長得更像了。', actionText: '下一層', resultText: '科：同科生物很相似' },
            { emoji: '🏷️', visual: '屬', title: '屬', description: '貓科裡面又分成豹屬（獅子、老虎）和貓屬（家貓、野貓）。屬名就是學名的第一個字！', actionText: '下一層', resultText: '屬：學名的第一個字' },
            { emoji: '🎯', visual: '種', title: '種（最小）', description: '「種」是最小的分類單位。同一種的生物可以互相交配生出有生殖能力的後代。例如家貓就是一個種：Felis catus。', actionText: '完成！', resultText: '種：最小的分類單位，記住口訣：界門綱目科屬種！' },
          ]
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
        id: 'concept4',
        title: '五界分類',
        interactionType: 'clickExplore',
        content: {
          title: '生物的五大王國',
          instruction: '點擊每個界，認識它的成員！',
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
        id: 'concept5',
        title: '病毒與檢索表',
        interactionType: 'clickExplore',
        content: {
          title: '病毒和生物分類工具',
          instruction: '點擊了解病毒的特殊性和檢索表的使用！',
          sceneEmoji: '🦠',
          items: [
            { id: 'virus_struct', emoji: '🧬', label: '病毒的構造', info: { title: '病毒很簡單', description: '病毒超級簡單，只有一段遺傳物質（DNA 或 RNA）外面包著一層蛋白質外殼。它沒有細胞結構，所以不算真正的「生物」。就像一封信，只有信紙和信封，沒有自己的房子。', category: '病毒', categoryColor: 'red' }},
            { id: 'virus_life', emoji: '🏠', label: '病毒怎麼活？', info: { title: '寄生才能繁殖', description: '病毒自己不能吃東西、不能產生能量、不能自己複製。它必須跑進其他生物的細胞裡面，借用細胞的工具來複製自己。所以病毒離開宿主就什麼都不能做，像一個沒有電池的遙控器。', category: '病毒', categoryColor: 'red' }},
            { id: 'virus_not_life', emoji: '❓', label: '病毒是生物嗎？', info: { title: '五界以外的存在', description: '病毒不屬於五界中的任何一界！因為它沒有細胞結構，不能獨立生存和繁殖。科學家通常不把病毒歸類為生物。但它又有遺傳物質、可以演化，所以算是生物和非生物的「邊界」。', category: '核心概念', categoryColor: 'purple' }},
            { id: 'virus_example', emoji: '😷', label: '常見的病毒', info: { title: '生活中的病毒', description: '流感病毒讓你發燒流鼻涕、腸病毒讓你手腳起水泡、COVID-19 的冠狀病毒⋯這些都是病毒造成的。噬菌體是專門攻擊細菌的病毒，科學家正在研究用它來對付超級細菌！', category: '病毒', categoryColor: 'orange' }},
            { id: 'dichotomous', emoji: '🔑', label: '檢索表', info: { title: '生物分類的工具', description: '檢索表就像一個「是非題闖關遊戲」。每一關問你一個問題（例如：有沒有翅膀？），根據你的回答走不同的路，最後就能找到這個生物是什麼。科學家用檢索表來快速辨認不認識的生物。', category: '分類工具', categoryColor: 'teal' }},
          ]
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
        title: '原核生物界',
        interactionType: 'clickExplore',
        content: {
          title: '最古老的生物——原核生物',
          instruction: '點擊每個項目，認識原核生物的世界！',
          sceneEmoji: '🦠',
          items: [
            { id: 'features', emoji: '🔬', label: '原核生物的特徵', info: { title: '沒有細胞核的生物', description: '原核生物的細胞裡沒有細胞核，DNA 就這樣散在細胞裡面，沒有被膜包起來。它們是地球上最早出現的生物，已經存在了 35 億年！雖然個頭小，但數量多到嚇人。', category: '基本特徵', categoryColor: 'blue' }},
            { id: 'bacteria', emoji: '🧫', label: '細菌', info: { title: '無所不在的細菌', description: '細菌幾乎到處都有：土壤裡、空氣中、你的手上、你的肚子裡⋯。大部分的細菌對人體無害，有些還有幫助！像腸道裡的益生菌幫助消化，根瘤菌幫植物抓住空氣中的氮。只有少部分細菌會讓人生病。', category: '細菌', categoryColor: 'green' }},
            { id: 'shapes', emoji: '⚪', label: '細菌的形狀', info: { title: '球菌、桿菌、螺旋菌', description: '細菌雖然都很小，但形狀不一樣。圓圓的叫「球菌」、像棒子的叫「桿菌」、像螺旋麵的叫「螺旋菌」。科學家用形狀來幫細菌分類。', category: '細菌', categoryColor: 'green' }},
            { id: 'cyano', emoji: '💚', label: '藍綠菌', info: { title: '會光合作用的原核生物', description: '藍綠菌是很特別的原核生物，它有葉綠素，會行光合作用！以前人們以為它是藻類（所以叫「藍綠藻」），後來發現它沒有細胞核，其實是細菌。水池表面那層綠綠的東西，很可能就是藍綠菌。', category: '藍綠菌', categoryColor: 'teal' }},
            { id: 'decompose', emoji: '♻️', label: '分解者的角色', info: { title: '大自然的回收站', description: '很多細菌是「分解者」，它們會把枯葉、動物遺體等分解成簡單的養分，讓植物可以再利用。沒有細菌，地球早就被垃圾堆滿了！', category: '生態角色', categoryColor: 'amber' }},
          ]
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
          explanation: '原核生物最大的特徵就是沒有細胞核，DNA 直接散在細胞質裡。藍綠菌雖然叫「藍綠藻」，但它沒有細胞核，是原核生物不是藻類。細菌有球菌、桿菌、螺旋菌等不同形狀。'
        }
      },
      {
        id: 'concept2',
        title: '原生生物界',
        interactionType: 'clickExplore',
        content: {
          title: '多樣的原生生物',
          instruction: '點擊認識三大類原生生物！',
          sceneEmoji: '🔬',
          items: [
            { id: 'protozoa', emoji: '🫧', label: '原生動物', info: { title: '像動物的原生生物', description: '草履蟲和變形蟲是常見的原生動物。它們是單細胞生物，但會像動物一樣自己到處跑、自己找食物吃。草履蟲用身上的纖毛游泳，變形蟲會伸出「假足」爬行和包住食物。', category: '原生動物', categoryColor: 'blue' }},
            { id: 'algae', emoji: '🌊', label: '藻類', info: { title: '像植物的原生生物', description: '藻類有葉綠素、會行光合作用，但構造比植物簡單很多。從小小的矽藻（單細胞）到巨大的海帶（多細胞）都是藻類。藻類住在水裡，是海洋中最重要的「生產者」，提供地球大部分的氧氣！', category: '藻類', categoryColor: 'green' }},
            { id: 'slime', emoji: '🟡', label: '原生菌類', info: { title: '像真菌的原生生物', description: '黏菌是最有名的原生菌類。它很奇妙：有時候像一大坨黏黏的東西到處爬（像動物），有時候又會長出孢子（像真菌）。科學家發現黏菌雖然沒有腦，但竟然能「聰明地」找到迷宮的最短路線！', category: '原生菌類', categoryColor: 'amber' }},
            { id: 'diatom', emoji: '💎', label: '矽藻', info: { title: '玻璃房子裡的小生物', description: '矽藻的細胞壁含有「矽」（做玻璃的材料），所以像住在透明玻璃屋裡一樣。它是單細胞藻類，超級小，但形狀超美，像小小的藝術品。矽藻是很多海洋生物的食物來源。', category: '藻類', categoryColor: 'teal' }},
            { id: 'malaria', emoji: '🦟', label: '瘧原蟲', info: { title: '會讓人生病的原生動物', description: '瘧原蟲是造成「瘧疾」的原生動物，通過蚊子叮咬傳播。瘧疾在非洲等熱帶地區是很嚴重的疾病。這告訴我們，原生生物雖然小，有些也會對人類造成危害。', category: '原生動物', categoryColor: 'red' }},
          ]
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
          explanation: '海帶是藻類，屬於原生生物界。它有細胞核、有葉綠素、會光合作用，但構造比植物簡單，沒有真正的根、莖、葉，所以不算植物。細菌和藍綠菌沒有細胞核，香菇是真菌不會光合作用。'
        }
      },
      {
        id: 'concept3',
        title: '真菌界',
        interactionType: 'clickExplore',
        content: {
          title: '認識真菌界',
          instruction: '點擊了解真菌界的三大類成員！',
          sceneEmoji: '🍄',
          items: [
            { id: 'features', emoji: '🧫', label: '真菌的特徵', info: { title: '不是植物的「植物」', description: '真菌有細胞壁、不會動，看起來很像植物。但它沒有葉綠素、不會光合作用，必須靠分解其他有機物（腐爛的東西）來獲取營養。它的細胞壁成分是「幾丁質」，跟昆蟲外殼一樣！', category: '基本特徵', categoryColor: 'purple' }},
            { id: 'yeast', emoji: '🍞', label: '酵母菌', info: { title: '單細胞真菌', description: '酵母菌是最簡單的真菌，只有一個細胞。它靠「出芽生殖」繁殖——從身上長出一個小芽，小芽長大後脫落變成新的個體。人類用它來做麵包（讓麵團膨脹）和釀酒（把糖變成酒精）。', category: '酵母菌', categoryColor: 'amber' }},
            { id: 'mold', emoji: '🟢', label: '黴菌', info: { title: '多細胞的菌絲體', description: '麵包放太久長出的綠色或白色毛毛的東西就是黴菌。黴菌由很多細長的「菌絲」組成，菌絲深入食物裡面分解營養。青黴素（盤尼西林）就是從青黴菌提煉出來的抗生素，救了無數人的命！', category: '黴菌', categoryColor: 'green' }},
            { id: 'mushroom', emoji: '🍄', label: '蕈類', info: { title: '最大的真菌', description: '香菇、木耳、靈芝都是蕈類。我們吃的部分其實是它的「子實體」（用來散播孢子的構造），就像植物的花。蕈類真正的身體是埋在土裡或木頭裡的菌絲，可以長得非常大！', category: '蕈類', categoryColor: 'orange' }},
            { id: 'role', emoji: '♻️', label: '真菌的生態角色', info: { title: '大自然的分解者', description: '真菌是生態系中最重要的分解者之一。它們分解枯葉、倒木和動物遺體，把有機物變回無機養分，讓植物可以再次吸收利用。沒有真菌，森林地上會堆滿枯葉，養分也無法循環！', category: '生態角色', categoryColor: 'teal' }},
          ]
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
          explanation: '真菌沒有葉綠素，不會光合作用！它是靠分解其他有機物來獲得營養的。真菌和植物雖然都不會動、都有細胞壁，但營養方式完全不同。'
        }
      },
      {
        id: 'concept4',
        title: '微生物與生態',
        interactionType: 'clickExplore',
        content: {
          title: '微生物在生態系的角色',
          instruction: '點擊了解微生物如何影響我們的世界！',
          sceneEmoji: '🌍',
          items: [
            { id: 'producer', emoji: '🌊', label: '海洋中的生產者', info: { title: '藻類：海洋的食物工廠', description: '海洋裡的藻類（特別是矽藻和浮游藻類）行光合作用產生的氧氣，佔了地球氧氣的一半以上！它們也是海洋食物鏈的基礎，小魚吃藻類，大魚吃小魚。', category: '生產者', categoryColor: 'green' }},
            { id: 'decomposer', emoji: '♻️', label: '分解者', info: { title: '細菌和真菌：回收站', description: '細菌和真菌負責把死掉的動植物分解成簡單的養分（像氮、磷），讓植物可以再利用。這就是「物質循環」——沒有分解者，地球上的養分就會用完！', category: '分解者', categoryColor: 'amber' }},
            { id: 'symbiosis', emoji: '🤝', label: '共生關係', info: { title: '互利共生', description: '很多微生物和其他生物互相幫助。例如根瘤菌住在豆科植物的根裡，幫植物把空氣中的氮變成養分；地衣是藻類和真菌的合體，藻類光合作用提供食物，真菌提供水分和保護。', category: '共生', categoryColor: 'blue' }},
            { id: 'human', emoji: '🧑', label: '人體裡的微生物', info: { title: '你身上有幾兆個微生物', description: '你的腸道裡住著幾兆個細菌，它們幫你消化食物、製造維生素、對抗壞菌。人體裡的微生物數量比你自己的細胞還多！保持腸道菌的平衡對健康非常重要。', category: '人體', categoryColor: 'purple' }},
            { id: 'harmful', emoji: '⚠️', label: '有害的微生物', info: { title: '致病微生物', description: '有些細菌（如肺結核桿菌）、原生動物（如瘧原蟲）和真菌（如香港腳的皮癬菌）會讓人生病。了解這些微生物的特性，才能更好地預防和治療疾病。', category: '致病', categoryColor: 'red' }},
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
        title: '植物界的特徵',
        interactionType: 'clickExplore',
        content: {
          title: '什麼是植物？',
          instruction: '點擊了解植物界的共同特徵和分類方式！',
          sceneEmoji: '🌱',
          items: [
            { id: 'features', emoji: '🌿', label: '植物的共同點', info: { title: '植物界的特徵', description: '所有植物都是多細胞生物、有細胞壁、有葉綠素、會行光合作用。植物是「自營生物」，自己製造食物，不需要吃別人。植物不會移動，但會向光生長。', category: '基本特徵', categoryColor: 'green' }},
            { id: 'vascular', emoji: '🚿', label: '維管束', info: { title: '植物的「水管系統」', description: '維管束就像植物體內的「水管」和「輸送帶」。它由木質部（往上送水分和礦物質）和韌皮部（往下送養分）組成。有維管束的植物可以長很高，沒有的就只能貼著地面長。', category: '分類依據', categoryColor: 'blue' }},
            { id: 'seed', emoji: '🌰', label: '種子', info: { title: '有沒有種子？', description: '蘚苔和蕨類沒有種子，用孢子繁殖（孢子像超小的粉末，飄到適合的地方就能長成新植物）。裸子植物和被子植物有種子，種子裡面有胚和養分，比孢子更能保護後代。', category: '分類依據', categoryColor: 'amber' }},
            { id: 'flower', emoji: '🌸', label: '花和果實', info: { title: '有沒有花？', description: '只有被子植物有花和果實。花負責繁殖（傳粉受精），果實保護種子並幫助散播。裸子植物有種子但沒有花和果實，種子是「裸露」的（通常在毬果裡面）。', category: '分類依據', categoryColor: 'pink' }},
            { id: 'classify', emoji: '📊', label: '植物的分類', info: { title: '四大類植物', description: '植物界分成四大類：蘚苔植物（沒有維管束）→ 蕨類植物（有維管束、沒種子）→ 裸子植物（有種子、沒花果）→ 被子植物（有花有果實）。越後面的越進化、越複雜。', category: '分類', categoryColor: 'purple' }},
          ]
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
        id: 'concept2',
        title: '蘚苔植物',
        interactionType: 'clickExplore',
        content: {
          title: '最簡單的植物——蘚苔',
          instruction: '點擊了解蘚苔植物的特色！',
          sceneEmoji: '🌱',
          items: [
            { id: 'no_vascular', emoji: '💧', label: '沒有維管束', info: { title: '沒有水管的植物', description: '蘚苔沒有維管束，水分只能靠細胞一個一個慢慢傳遞，速度很慢。所以蘚苔長不高，通常只有幾公分，都是貼著地面生長。它像是用毛巾吸水，而不是用水管送水。', category: '構造特徵', categoryColor: 'blue' }},
            { id: 'no_root', emoji: '🌿', label: '假根', info: { title: '沒有真正的根', description: '蘚苔的根只是「假根」——看起來像根，但功能只是固定在地面或石頭上，不能吸收水分和礦物質。蘚苔吸水主要靠整個身體表面，所以它們喜歡待在潮濕的地方。', category: '構造特徵', categoryColor: 'green' }},
            { id: 'spore', emoji: '✨', label: '孢子繁殖', info: { title: '用孢子散播後代', description: '蘚苔沒有種子，靠超小的「孢子」繁殖。孢子成熟後會從孢蒴（像小火柴棒的構造）彈出來，隨風飄到新的地方。落在潮濕處的孢子就能長成新的蘚苔。', category: '繁殖', categoryColor: 'amber' }},
            { id: 'water', emoji: '🌧️', label: '需要水才能受精', info: { title: '離不開水', description: '蘚苔的精子必須在水中游泳才能找到卵。所以蘚苔一定要住在潮濕的地方，像是森林底部、石頭縫、溪邊等。這也是蘚苔不能住在乾燥地方的原因。', category: '繁殖', categoryColor: 'teal' }},
            { id: 'example', emoji: '🏔️', label: '常見蘚苔', info: { title: '蘚苔在哪裡？', description: '土馬騌是常見的蘚。你在森林裡看到石頭上、樹幹上那層綠綠軟軟的東西，很多就是蘚苔。泥炭蘚可以吸收自己重量 20 倍的水，是天然的大海綿！', category: '生活例子', categoryColor: 'purple' }},
          ]
        },
        quiz: {
          question: '下列關於蘚苔植物的敘述何者正確？',
          options: [
            '(A) 蘚苔有維管束所以能長很高',
            '(B) 蘚苔有真正的根可以吸水',
            '(C) 蘚苔用孢子繁殖，且需要水才能受精',
            '(D) 蘚苔有種子可以散播到遠方'
          ],
          correctIndex: 2,
          explanation: '蘚苔沒有維管束也沒有真正的根，更沒有種子。它用孢子繁殖，而且精子必須在水裡游泳才能到達卵，所以蘚苔一定住在潮濕的地方。'
        }
      },
      {
        id: 'concept3',
        title: '蕨類植物',
        interactionType: 'clickExplore',
        content: {
          title: '有維管束但沒種子——蕨類',
          instruction: '點擊了解蕨類植物的特色！',
          sceneEmoji: '🌿',
          items: [
            { id: 'vascular', emoji: '🚿', label: '有維管束', info: { title: '比蘚苔更進化', description: '蕨類有了維管束（植物的水管系統），可以有效率地輸送水分和養分，所以能長得比蘚苔高很多。有些樹蕨甚至可以長到好幾公尺高！維管束是蕨類比蘚苔更進化的關鍵。', category: '構造特徵', categoryColor: 'blue' }},
            { id: 'true_parts', emoji: '🌱', label: '有真正的根莖葉', info: { title: '完整的器官', description: '蕨類有真正的根（能吸水和礦物質）、莖（大部分是地下莖）和葉（進行光合作用）。跟蘚苔的「假根假莖假葉」完全不同，蕨類是真材實料的！', category: '構造特徵', categoryColor: 'green' }},
            { id: 'spore', emoji: '🟤', label: '孢子囊', info: { title: '葉子背面的圓點', description: '翻開蕨類的葉子，常常可以看到背面有很多褐色的小圓點，那就是「孢子囊堆」。裡面裝了滿滿的孢子，成熟後會彈出來隨風散播。有些人以為那是蟲卵，其實不是喔！', category: '繁殖', categoryColor: 'amber' }},
            { id: 'water', emoji: '💧', label: '還是需要水', info: { title: '精子仍需游泳', description: '蕨類跟蘚苔一樣，精子需要水才能游到卵的地方完成受精。所以蕨類也比較喜歡待在潮濕的環境，像森林底部或瀑布旁邊。', category: '繁殖', categoryColor: 'teal' }},
            { id: 'example', emoji: '🌿', label: '生活中的蕨類', info: { title: '常見蕨類植物', description: '筆筒樹是台灣常見的樹蕨，可以長到好幾公尺高。腎蕨常被用來當盆栽。山蘇花也是蕨類，鳥巢蕨的嫩葉可以吃（就是餐廳菜單上的「山蘇」）！台灣是蕨類的天堂，種類超過 600 種！', category: '生活例子', categoryColor: 'purple' }},
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
          explanation: '蕨類最大的進步就是有了維管束，讓它可以長更高、更有效率地運送水分。但蕨類還是沒有種子（用孢子繁殖），也不會開花，精子仍然需要水才能受精。'
        }
      },
      {
        id: 'concept4',
        title: '裸子植物與被子植物',
        interactionType: 'clickExplore',
        content: {
          title: '種子植物的兩大類',
          instruction: '點擊比較裸子植物和被子植物的不同！',
          sceneEmoji: '🌳',
          items: [
            { id: 'gymnosperm', emoji: '🌲', label: '裸子植物', info: { title: '種子裸露的植物', description: '裸子植物有種子，但種子是「裸露」的，沒有果實包住。大部分裸子植物的種子藏在毬果裡面（像松果）。常見的裸子植物有松樹、柏樹、杉木、銀杏、蘇鐵。它們不會開花，靠風來傳粉。', category: '裸子植物', categoryColor: 'green' }},
            { id: 'angiosperm', emoji: '🌸', label: '被子植物', info: { title: '有花有果實的植物', description: '被子植物是最進化的植物，有花、有果實。花負責繁殖（吸引昆蟲或鳥來傳粉），果實包住種子並幫助散播。被子植物是現在地球上種類最多、數量最多的植物，我們吃的大部分食物都來自被子植物。', category: '被子植物', categoryColor: 'pink' }},
            { id: 'monocot', emoji: '🌾', label: '單子葉植物', info: { title: '被子植物的一類', description: '單子葉植物的種子只有一片子葉（種子最先長出來的葉子）。特徵：葉脈平行、花瓣通常 3 的倍數、莖內維管束散生。常見的有稻米、小麥、玉米、竹子、百合、蘭花。', category: '被子植物', categoryColor: 'amber' }},
            { id: 'dicot', emoji: '🌻', label: '雙子葉植物', info: { title: '被子植物的另一類', description: '雙子葉植物的種子有兩片子葉。特徵：葉脈網狀、花瓣通常 4 或 5 的倍數、莖內維管束排成環狀。常見的有玫瑰、向日葵、豆類、蘋果樹、橡樹。我們吃的水果大部分來自雙子葉植物。', category: '被子植物', categoryColor: 'blue' }},
            { id: 'no_water', emoji: '🌬️', label: '不再需要水', info: { title: '種子植物的大進步', description: '種子植物（裸子和被子）不需要水來幫精子游泳了！裸子植物靠風傳花粉，被子植物靠風或動物傳花粉。這讓種子植物可以住在乾燥的地方，征服了整個陸地！', category: '演化意義', categoryColor: 'purple' }},
            { id: 'compare', emoji: '⚖️', label: '四類植物比較', info: { title: '從簡單到複雜', description: '蘚苔 → 蕨類 → 裸子 → 被子，越來越進化。蘚苔最簡單（沒有維管束和種子）；蕨類有維管束但沒種子；裸子有種子但沒花果；被子最完整（有花有果實）。', category: '總整理', categoryColor: 'teal' }},
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
          explanation: '最大的差異就是被子植物有花和果實，裸子植物沒有。裸子植物的種子是「裸露」的（通常在毬果裡），而被子植物的種子被果實包住保護。兩者都有維管束和種子。'
        }
      }
    ]
  }
];
