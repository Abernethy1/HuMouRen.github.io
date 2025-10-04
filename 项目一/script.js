// 非遗传承主题网站交互脚本

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 首先获取古风句子相关元素并显示文字
    const sentenceText = document.querySelector('.sentence-text');
    
    // 古风句子库
    const sentences = [
        "长安十二时辰，一瞬也是千年。",
        "皮影点亮白幕，鼓声撞破夜色。",
        "老腔一声吼，响彻长安城。",
        "千年传承，匠心不灭。",
        "非遗之美，在于传承。"
    ];
    
    // 随机切换古风句子
    function changeSentence() {
        if (sentenceText) {
            const randomIndex = Math.floor(Math.random() * sentences.length);
            sentenceText.textContent = sentences[randomIndex];
        }
    }
    
    // 立即显示古风句子，不延迟
    changeSentence();
    
    // 获取其他DOM元素
    const loadingPage = document.getElementById('loading-page');
    const categoryPage = document.getElementById('category-page');
    const detailPage = document.getElementById('detail-page');
    const ancientSentence = document.getElementById('ancient-sentence');
    const categoryItems = document.querySelectorAll('.category-item');
    const backToCategory = document.getElementById('back-to-category');
    const detailTitle = document.getElementById('detail-title');
    const detailImage = document.getElementById('detail-image');
    const detailDescription = document.getElementById('detail-description');
    const bgVideo = document.querySelector('.bg-video');
    const videoFallback = document.querySelector('.video-fallback');
    const detailVideo = document.getElementById('detail-video');
    const replayButton = document.getElementById('replay-video');

    // 视频加载失败检测
    if (bgVideo && videoFallback) {
        
        // 视频播放控制逻辑
        if (detailVideo && replayButton) {
            // 监听视频播放结束事件
            detailVideo.addEventListener('ended', function() {
                // 视频播放结束后显示重新播放按钮
                replayButton.style.display = 'block';
            });
            
            // 重新播放按钮点击事件
            replayButton.addEventListener('click', function() {
                // 隐藏重新播放按钮
                replayButton.style.display = 'none';
                // 重置视频并重新播放
                detailVideo.currentTime = 0;
                detailVideo.play();
            });
        }
        
        // 初始隐藏备用背景
        videoFallback.style.display = 'none';
        
        // 视频加载错误时显示备用背景
        bgVideo.addEventListener('error', function() {
            console.error('视频加载失败，显示备用背景');
            bgVideo.style.display = 'none';
            videoFallback.style.display = 'block';
        });
        
        // 尝试播放视频，如果播放失败则显示备用背景
        bgVideo.addEventListener('canplay', function() {
            console.log('视频可以播放');
        });
        
        // 使用setTimeout作为最后的安全保障
        setTimeout(function() {
            if (bgVideo.paused && bgVideo.readyState < 3) {
                console.warn('视频未能正常播放，显示备用背景');
                bgVideo.style.display = 'none';
                videoFallback.style.display = 'block';
            }
        }, 3000);
        
        // 更新调试信息显示
        function updateDebugInfo(status, error) {
            const statusElement = document.getElementById('video-status');
            const errorElement = document.getElementById('video-error');
            
            if (statusElement) {
                statusElement.textContent = status;
                statusElement.style.color = error ? 'red' : 'green';
            }
            
            if (errorElement) {
                errorElement.textContent = error || '暂无';
            }
        }
        
        // 为视频添加更多事件监听器来更新调试信息
        bgVideo.addEventListener('loadstart', function() {
            updateDebugInfo('开始加载视频...', '');
        });
        
        bgVideo.addEventListener('loadeddata', function() {
            updateDebugInfo('视频数据已加载', '');
        });
        
        bgVideo.addEventListener('canplaythrough', function() {
            updateDebugInfo('视频可以流畅播放', '');
        });
        
        bgVideo.addEventListener('stalled', function() {
            updateDebugInfo('视频加载停滞', '网络可能不稳定');
        });
        
        bgVideo.addEventListener('waiting', function() {
            updateDebugInfo('等待视频数据', '缓冲中...');
        });
        
        bgVideo.addEventListener('ended', function() {
            updateDebugInfo('视频播放结束', '将重新开始播放');
        });
        
        // 检查视频是否支持当前浏览器
        if (bgVideo.canPlayType) {
            const mp4Support = bgVideo.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            updateDebugInfo('浏览器支持检测', 'MP4支持: ' + (mp4Support ? mp4Support : '不支持'));
        }
    }

    // 非遗数据
    const heritageData = {
        piying: {
            title: "皮影戏",
            image: "https://picsum.photos/id/1035/800/600",
            description: "皮影戏是一种古老的民间艺术，用兽皮或纸板做成的人物剪影来表演故事。在灯光的映照下，艺人在白色幕布后面，一边操纵影人，一边用当地流行的曲调讲述故事，同时配以打击乐器和弦乐，有浓厚的乡土气息。\n\n西安皮影戏历史悠久，起源于汉代，成熟于唐宋时期，在明清时期达到鼎盛。它不仅是一种艺术表现形式，更是承载着丰富的历史文化信息的重要载体。\n\n如今，皮影戏已被列入国家级非物质文化遗产名录，成为中华民族优秀传统文化的重要组成部分。",
            // 皮影戏包含多个子页面
            pages: {
                a: {
                    title: "光影破圈",
                    image: "../img/皮影A光影破圈.jpg",
                    video: ""
                },
                b: {
                    title: "师徒传承",
                    image: "../img/皮影B师徒传承.jpg",
                    video: ""
                },
                c: {
                    title: "创新融合",
                    image: "../img/皮影C创新融合.jpg",
                    video: ""
                }
            }
        },
        laoqiang: {
            title: "老腔",
            // 老腔包含多个子页面
            pages: {
                a: {
                    title: "黄河新唱",
                    image: "../img/老腔A黄河新唱.jpg",
                    video: "../video/老腔A黄河新唱.mp4"
                },
                b: {
                    title: "血脉相承",
                    image: "../img/老腔B血脉相承.jpg",
                    video: "../video/老腔B血脉相承.mp4"
                },
                c: {
                    title: "绝唱守望",
                    image: "../img/老腔C绝唱守望.jpg",
                    video: ""
                }
            }
        }
    };
    
    // 当前非遗页面索引 - 改为通用结构
    let currentHeritageType = '';
    let currentHeritagePage = '';

    // 点击屏幕跳转到选择页面
    loadingPage.addEventListener('click', function(e) {
        // 确保点击的不是音乐控制按钮
        if (!e.target.closest('.music-control') && !e.target.closest('.music-control-category') && !e.target.closest('.music-control-detail')) {
            // 在用户交互时尝试播放音乐
            const backgroundMusic = document.getElementById('background-music');
            if (backgroundMusic) {
                backgroundMusic.muted = false; // 取消静音
                backgroundMusic.play().catch(e => {
                    console.log('音乐播放失败:', e);
                });
            }
            animatePageTransition(loadingPage, categoryPage);
        }
    });

    // 点击非遗类别进入详情页面
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 确保点击的不是音乐控制按钮
            if (!e.target.closest('.music-control') && !e.target.closest('.music-control-category') && !e.target.closest('.music-control-detail')) {
                const heritageType = this.getAttribute('data-type');
                const heritage = heritageData[heritageType];
                
                // 特殊处理老腔和皮影戏类别，跳转到师傅考题环节
                if (heritageType === 'laoqiang') {
                    window.location.href = 'master-question.html?type=laoqiang';
                    return;
                }
                if (heritageType === 'piying') {
                    window.location.href = 'master-question.html?type=piying';
                    return;
                }
                
                if (heritage) {
                    // 保存当前非遗类型
                    currentHeritageType = heritageType;
                    
                    // 检查是否有多页内容
                    if (heritage.pages) {
                        // 获取第一页的键名 (假设按照字母顺序排列)
                        const firstPageKey = Object.keys(heritage.pages)[0];
                        currentHeritagePage = firstPageKey;
                        
                        const currentPage = heritage.pages[currentHeritagePage];
                        
                        // 更新详情页内容
                        detailTitle.querySelector('h1').textContent = currentPage.title;
                        detailImage.src = currentPage.image;
                        
                        // 更新视频源
                        if (detailVideo) {
                            if (currentPage.video) {
                                detailVideo.src = currentPage.video;
                                detailVideo.load();
                                detailVideo.play();
                                replayButton.style.display = 'none'; // 隐藏重播按钮
                                detailVideo.style.display = 'block'; // 显示视频
                            } else {
                                detailVideo.src = ''; // 清空视频源
                                detailVideo.style.display = 'none'; // 隐藏视频
                                replayButton.style.display = 'none'; // 隐藏重播按钮
                            }
                        }
                        
                        // 显示上一页和下一页按钮
                        if (prevPageButton) prevPageButton.style.display = 'block';
                        if (nextPageButton) nextPageButton.style.display = 'inline-block';
                    } else {
                        // 普通非遗类别处理
                        detailTitle.querySelector('h1').textContent = heritage.title;
                        detailImage.src = heritage.image;
                        currentHeritagePage = '';
                        
                        // 隐藏导航按钮
                        if (prevPageButton) prevPageButton.style.display = 'none';
                        if (nextPageButton) nextPageButton.style.display = 'none';
                    }
                    
                    // 使用动画切换页面
                    animatePageTransition(categoryPage, detailPage);
                }
            }
        });
    });

    // 返回选择页面 - 添加元素存在性检查
    if (backToCategory) {
        backToCategory.addEventListener('click', function(e) {
            console.log('返回按钮被点击，准备切换到选择页面');
            // 直接切换页面，不进行条件过滤
            animatePageTransition(detailPage, categoryPage);
        });
    }

    // 调用加载页面动画
    animateLoadingPage();
    
    // 设置音乐控制功能
    setupMusicControl();

    // 获取上一页和下一页按钮
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    
    // 初始化上一页按钮（默认显示）
    if (prevPageButton) {
        prevPageButton.style.display = 'block';
    }
    
    // 获取下一个页面按钮并添加点击事件 - 修改为通用逻辑
    if (nextPageButton) {
        nextPageButton.addEventListener('click', function(e) {
            // 确保点击的不是音乐控制按钮
            if (!e.target.closest('.music-control') && !e.target.closest('.music-control-category') && !e.target.closest('.music-control-detail')) {
                const heritage = heritageData[currentHeritageType];
                
                if (heritage && heritage.pages && currentHeritagePage) {
                    // 获取所有页面键名并排序
                    const pageKeys = Object.keys(heritage.pages).sort();
                    const currentIndex = pageKeys.indexOf(currentHeritagePage);
                    
                    // 检查是否有下一页
                    if (currentIndex !== -1 && currentIndex < pageKeys.length - 1) {
                        // 切换到下一页
                        currentHeritagePage = pageKeys[currentIndex + 1];
                        const currentPage = heritage.pages[currentHeritagePage];
                        
                        // 更新详情页内容
                        detailTitle.querySelector('h1').textContent = currentPage.title;
                        detailImage.src = currentPage.image;
                        
                        // 更新视频源
                        if (detailVideo) {
                            if (currentPage.video) {
                                detailVideo.src = currentPage.video;
                                detailVideo.load();
                                detailVideo.play();
                                replayButton.style.display = 'none'; // 隐藏重播按钮
                                detailVideo.style.display = 'block'; // 显示视频
                            } else {
                                detailVideo.src = ''; // 清空视频源
                                detailVideo.style.display = 'none'; // 隐藏视频
                                replayButton.style.display = 'none'; // 隐藏重播按钮
                            }
                        }
                        
                        // 显示上一页按钮
                        if (prevPageButton) prevPageButton.style.display = 'inline-block';
                        
                        // 对于所有非遗类型的页面，始终显示下一页按钮
                        if (nextPageButton) nextPageButton.style.display = 'inline-block';
                    } else if (currentIndex !== -1 && currentIndex === pageKeys.length - 1 && currentHeritagePage === 'c') {
                        // 如果是任何非遗类型的最后一页，跳转到师傅考题环节
                        console.log('即将进入师傅考题环节');
                        // 跳转到师傅考题页面，并传递当前非遗类型
                        window.location.href = `master-question.html?type=${currentHeritageType}`;
                    }
                }
            }
        });
    }
    
    // 获取上一页按钮并添加点击事件 - 修复导航逻辑
    if (prevPageButton) {
        // 直接为上一页按钮添加点击事件
        function handlePrevPageClick(e) {
            // 确保点击的不是音乐控制按钮
            if (!e.target.closest('.music-control') && !e.target.closest('.music-control-category') && !e.target.closest('.music-control-detail')) {
                const heritage = heritageData[currentHeritageType];
                
                if (heritage && heritage.pages && currentHeritagePage) {
                    // 获取所有页面键名并排序
                    const pageKeys = Object.keys(heritage.pages).sort();
                    const currentIndex = pageKeys.indexOf(currentHeritagePage);
                    
                    console.log('上一页按钮点击:', '当前页面:', currentHeritagePage, '当前索引:', currentIndex, '总页数:', pageKeys.length);
                    
                    // 检查是否有上一页
                    if (currentIndex > 0) {
                        // 切换到上一页
                        currentHeritagePage = pageKeys[currentIndex - 1];
                        const currentPage = heritage.pages[currentHeritagePage];
                        
                        console.log('切换到上一页:', currentHeritagePage);
                        
                        // 更新详情页内容
                        detailTitle.querySelector('h1').textContent = currentPage.title;
                        detailImage.src = currentPage.image;
                        
                        // 更新视频源
                        if (detailVideo) {
                            if (currentPage.video) {
                                detailVideo.src = currentPage.video;
                                detailVideo.load();
                                detailVideo.play();
                                replayButton.style.display = 'none'; // 隐藏重播按钮
                                detailVideo.style.display = 'block'; // 显示视频
                            } else {
                                detailVideo.src = ''; // 清空视频源
                                detailVideo.style.display = 'none'; // 隐藏视频
                                replayButton.style.display = 'none'; // 隐藏重播按钮
                            }
                        }
                        
                        // 显示下一页按钮
                        if (nextPageButton) nextPageButton.style.display = 'inline-block';
                    } else {
                        // 如果是第一页，返回到非遗门类选择界面
                        console.log('当前是第一页，返回非遗门类选择界面');
                        animatePageTransition(detailPage, categoryPage);
                    }
                } else {
                    console.log('heritage数据或当前页面信息不存在');
                }
            }
        }
        
        // 为按钮本身添加点击事件
        prevPageButton.addEventListener('click', handlePrevPageClick);
        
        // 为按钮容器添加点击事件，确保点击区域更大
        const prevPageContainer = document.querySelector('.btn-left-2');
        if (prevPageContainer) {
            prevPageContainer.addEventListener('click', function(e) {
                // 如果点击的是按钮本身，不重复处理
                if (!e.target.closest('#prev-page')) {
                    handlePrevPageClick(e);
                }
            });
        }
    }

    // 添加页面切换动画
    function animatePageTransition(fromPage, toPage) {
        console.log(`切换页面: 从 ${fromPage.id} 到 ${toPage.id}`);
        
        // 确保元素存在
        if (!fromPage || !toPage) {
            console.error('页面元素不存在');
            return;
        }
        
        // 为了避免过渡效果冲突，先重置所有页面的样式
        document.querySelectorAll('.full-screen-container').forEach(page => {
            page.style.transition = '';
            page.style.opacity = '';
        });
        
        // 为当前页面和目标页面添加过渡效果
        fromPage.style.transition = 'opacity 0.5s ease';
        toPage.style.transition = 'opacity 0.5s ease';
        
        // 开始淡出当前页面
        fromPage.style.opacity = '0';
        
        // 等待淡出完成后再切换页面显示状态
        setTimeout(() => {
            // 隐藏当前页面
            fromPage.classList.add('d-none');
            
            // 显示目标页面
            toPage.classList.remove('d-none');
            
            // 确保目标页面初始透明度为0
            toPage.style.opacity = '0';
            
            // 强制浏览器重排，确保动画效果
            void toPage.offsetWidth;
            
            // 开始淡入目标页面
            toPage.style.opacity = '1';
            
            // 动画完成后清除过渡样式
            setTimeout(() => {
                fromPage.style.transition = '';
                toPage.style.transition = '';
            }, 500);
        }, 500);
    }

    // 添加调试信息，帮助确认元素是否正确加载
    console.log('DOM已加载完成');
    console.log('loadingPage元素:', loadingPage);
    console.log('categoryPage元素:', categoryPage);
    console.log('detailPage元素:', detailPage);
    console.log('categoryItems数量:', categoryItems.length);

    // 为选择项目添加悬停效果
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // 实现响应式调整
    function adjustForResponsive() {
        const width = window.innerWidth;
        
        if (width < 768) {
            ancientSentence.style.fontSize = '1.5rem';
        } else {
            ancientSentence.style.fontSize = '1.8rem';
        }
    }

    // 初始化响应式调整
    adjustForResponsive();
    
    // 监听窗口大小变化
    window.addEventListener('resize', adjustForResponsive);

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 预加载图片
    function preloadImages() {
        for (const key in heritageData) {
            if (heritageData.hasOwnProperty(key)) {
                const img = new Image();
                img.src = heritageData[key].image;
            }
        }
    }

    // 预加载图片
    preloadImages();

    // 为加载页面添加动画效果
    function animateLoadingPage() {
        const sentences = document.querySelectorAll('.sentence-text');
        sentences.forEach((sentence, index) => {
            sentence.style.animation = `fadeIn 1s ease ${index * 0.5}s forwards`;
        });
        
        // 为底部蓝色圆圈添加淡入动画
        const blueCircle = document.querySelector('.bottom-blue-circle');
        if (blueCircle) {
            blueCircle.style.opacity = '0';
            blueCircle.style.transform = 'translateX(-50%) translateY(20px)';
            blueCircle.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                blueCircle.style.opacity = '1';
                blueCircle.style.transform = 'translateX(-50%) translateY(0)';
            }, 1000);
        }
        
        // 为音乐控制按钮添加淡入动画
        const musicControl = document.getElementById('music-control');
        if (musicControl) {
            musicControl.style.opacity = '0';
            musicControl.style.transform = 'translateY(-20px)';
            musicControl.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                musicControl.style.opacity = '1';
                musicControl.style.transform = 'translateY(0)';
            }, 1500);
        }
    }

    // 音乐控制设置函数
    function setupMusicControl() {
        const backgroundMusic = document.getElementById('background-music');
        const musicToggleBtns = document.querySelectorAll('.music-toggle-btn');
        
        // 检查元素是否存在
        if (!backgroundMusic || musicToggleBtns.length === 0) {
            console.log('音乐元素或控制按钮不存在');
            return;
        }

        // 同步更新所有音乐按钮的图标
        function updateAllMusicIcons() {
            musicToggleBtns.forEach(btn => {
                const icon = btn.querySelector('.music-icon');
                if (icon) {
                    if (backgroundMusic.muted) {
                        icon.classList.remove('fa-music');
                        icon.classList.add('fa-volume-off');
                    } else {
                        icon.classList.remove('fa-volume-off');
                        icon.classList.add('fa-music');
                    }
                }
            });
        }

        // 检查音乐播放状态
        function checkPlayState() {
            if (backgroundMusic.paused) {
                try {
                    backgroundMusic.play().catch(e => {
                        console.log('音乐播放失败:', e);
                    });
                } catch (error) {
                    console.log('播放音乐出错:', error);
                }
            }
            updateAllMusicIcons();
        }

        // 添加音乐控制按钮点击事件
        musicToggleBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡，避免触发页面点击事件
                backgroundMusic.muted = !backgroundMusic.muted;
                updateAllMusicIcons();
                
                // 在用户点击音乐控制按钮时尝试播放音乐
                if (!backgroundMusic.paused) return; // 如果已经在播放，就不再尝试
                
                try {
                    backgroundMusic.play().catch(e => {
                        console.log('音乐播放失败:', e);
                    });
                } catch (error) {
                    console.log('播放音乐出错:', error);
                }
            });
        });

        // 不需要在这里重复添加loadingPage的点击事件监听器
        // 取消静音的功能已经在loadingPage的主点击事件中实现
        
        // 确保在初始化时音乐是静音的
        backgroundMusic.muted = true;

        // 音乐结束后循环播放
        backgroundMusic.addEventListener('ended', function() {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play().catch(e => {
                console.log('音乐循环播放失败:', e);
            });
        });

        // 初始化时不尝试自动播放音乐（避免浏览器安全策略限制）
        // 音乐将在用户与页面交互（如点击音乐控制按钮或loadingPage）时播放
    }

    // 为页面添加键盘导航
    document.addEventListener('keydown', function(e) {
        // 空格键跳转到下一页
        if (e.code === 'Space' && !loadingPage.classList.contains('d-none')) {
            loadingPage.click();
        }
        
        // Esc键返回上一页
        if (e.code === 'Escape') {
            if (!detailPage.classList.contains('d-none')) {
                backToCategory.click();
            } else if (!categoryPage.classList.contains('d-none')) {
                animatePageTransition(categoryPage, loadingPage);
                // 返回时显示一个新的随机古风句子，不使用定时器
                const sentenceText = document.querySelector('.sentence-text');
                const sentences = [
                    "长安十二时辰，一瞬也是千年。",
                    "皮影点亮白幕，鼓声撞破夜色。",
                    "老腔一声吼，响彻长安城。",
                    "千年传承，匠心不灭。",
                    "非遗之美，在于传承。"
                ];
                if (sentenceText) {
                    const randomIndex = Math.floor(Math.random() * sentences.length);
                    sentenceText.textContent = sentences[randomIndex];
                }
            }
        }
        
        // 数字键1和2选择非遗类别
        if (e.code === 'Digit1' && !categoryPage.classList.contains('d-none')) {
            const piyingItem = document.querySelector('[data-type="piying"]');
            if (piyingItem) piyingItem.click();
        }
        
        if (e.code === 'Digit2' && !categoryPage.classList.contains('d-none')) {
            const laoqiangItem = document.querySelector('[data-type="laoqiang"]');
            if (laoqiangItem) laoqiangItem.click();
        }
    });
});