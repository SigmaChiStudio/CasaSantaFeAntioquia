(function(){
    var script = {
 "mouseWheelEnabled": true,
 "class": "Player",
 "backgroundPreloadEnabled": true,
 "id": "rootPlayer",
 "defaultVRPointer": "laser",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.MainViewer",
  "this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC"
 ],
 "vrPolyfillScale": 0.5,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "width": "100%",
 "verticalAlign": "top",
 "downloadEnabled": false,
 "borderRadius": 0,
 "scripts": {
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "existsKey": function(key){  return key in window; },
  "unregisterKey": function(key){  delete window[key]; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getKey": function(key){  return window[key]; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "registerKey": function(key, value){  window[key] = value; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); }
 },
 "minHeight": 20,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "minWidth": 20,
 "overflow": "visible",
 "height": "100%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.61,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D05B814B_C24A_7C2B_41D7_2B295A4D7210",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 18.23,
    "yawSpeed": 35.63,
    "targetYaw": 9.54,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 7.92,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -158.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D042877D_C24A_04EE_41E4_4CAD53FCCAB6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -62.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D62683B7_C24A_7C7A_41D6_918D69D82766",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.56,
  "pitch": 0,
  "hfov": 129
 },
 "id": "camera_D3BBA121_C24A_7C16_41DD_8CADB56D07B7",
 "automaticZoomSpeed": 10
},
{
 "label": "Ba\u00f1o Habitaci\u00f3n Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_t.jpg"
  }
 ],
 "id": "panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "yaw": 100.94,
   "class": "AdjacentPanorama",
   "backwardYaw": -69.85,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -86.19,
   "class": "AdjacentPanorama",
   "backwardYaw": 25.09,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A677D88F_B3BC_2E05_41D7_EFC39973BFD7",
  "this.overlay_A66464B6_B3BC_E606_41CA_DE4D2DC1AF23"
 ],
 "thumbnailUrl": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 10.04,
    "yawSpeed": 19.16,
    "targetYaw": 9.54,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 7.92,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -78.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1BAB341_C24A_7C16_41E6_F5F810CA8D48",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 54.94,
  "pitch": -2.69,
  "hfov": 130
 },
 "id": "panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.81,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D1FA804F_C24A_7C2A_41E3_E9C3ACB983B6",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 3",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A1102A1B_B294_620E_41C6_0AFD68920E5F",
  "this.overlay_A6E69AE0_B294_223B_41E1_8EA28F4153E5",
  "this.overlay_A118C749_B294_620D_41D9_311280482196"
 ],
 "thumbnailUrl": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "yaw": 101.76,
   "class": "AdjacentPanorama",
   "backwardYaw": 20.87,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": 21.66,
   "class": "AdjacentPanorama",
   "backwardYaw": 91.25,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "yaw": 22.45,
   "class": "AdjacentPanorama",
   "backwardYaw": -133.51,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -25.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D064A7DA_C24A_042A_41D6_9901504BB924",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.73,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D18A905E_C24A_7C2D_41D3_88A756611854",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 3 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_t.jpg"
  }
 ],
 "id": "panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A15EDDED_B28F_E605_41E3_95E1B137D21C",
  "this.overlay_A6361CB7_B28C_2605_41D8_2365410F49EF"
 ],
 "thumbnailUrl": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": -95.09,
   "class": "AdjacentPanorama",
   "backwardYaw": 73.73,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "yaw": 114.67,
   "class": "AdjacentPanorama",
   "backwardYaw": 40.71,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -130.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6D493D7_C24A_7C3A_41E4_6C2CCB909B47",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 89.5,
    "yawSpeed": 178.83,
    "targetYaw": -128.19,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.32,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -115.76,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -47.55,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.91,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D3A8C101_C24A_7C16_41DD_835BB48147D6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -173.14,
  "class": "PanoramaCameraPosition",
  "pitch": 1.91
 },
 "id": "panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 32.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D3EB909E_C24A_7C2A_41B7_730DF28BE421",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 9.54,
  "class": "PanoramaCameraPosition",
  "pitch": 7.92
 },
 "id": "panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Calle",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A355CF73_B574_11BD_41E0_5D4FB1E55AEB",
  "this.overlay_ACD895B7_B574_10A5_41C0_121645A3CBB6",
  "this.overlay_A3613C37_B574_37A5_41D8_B29C6D57DA6F"
 ],
 "thumbnailUrl": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "yaw": -24.28,
   "class": "AdjacentPanorama",
   "backwardYaw": -56.55,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -113.28,
   "class": "AdjacentPanorama",
   "backwardYaw": -5.39,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "yaw": -116.43,
   "class": "AdjacentPanorama",
   "backwardYaw": 18.72,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "label": "Pasillo Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "yaw": 171.37,
   "class": "AdjacentPanorama",
   "backwardYaw": -113.09,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "yaw": -165.37,
   "class": "AdjacentPanorama",
   "backwardYaw": -23.44,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "yaw": 10.84,
   "class": "AdjacentPanorama",
   "backwardYaw": 59.91,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": 92.36,
   "class": "AdjacentPanorama",
   "backwardYaw": -164.86,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -83.22,
   "class": "AdjacentPanorama",
   "backwardYaw": -85.39,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A11A94FB_B29C_E60D_41D0_8D8502D57E81",
  "this.overlay_A1456C90_B29C_261B_41BD_F9A10C71356D",
  "this.overlay_A11564EB_B29C_260D_41D5_6A4CE8C0A213",
  "this.overlay_A2A67653_B6CF_AED3_41E6_804ACA3BFEA0",
  "this.overlay_A3E7C0A3_B6CC_A273_41D1_B060EF130F1E"
 ],
 "thumbnailUrl": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -120.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D3E7A0BE_C24A_7C6A_41E5_18DF4231DF91",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 68.55,
  "class": "PanoramaCameraPosition",
  "pitch": -2.33
 },
 "id": "panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Ducha Habitaci\u00f3n P Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_t.jpg"
  }
 ],
 "id": "panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "yaw": -67.45,
   "class": "AdjacentPanorama",
   "backwardYaw": 78.9,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A151E8BA_B294_EE0C_41D7_D78A106E34D6",
  "this.overlay_A1330E00_B2F4_65FB_41DB_A2656859E799"
 ],
 "thumbnailUrl": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -168.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0.99
 },
 "id": "panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Piscina 3",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A32203F1_B69C_10BD_41E6_675DD40D1DD6",
  "this.overlay_ACAC7056_B69C_2FE7_41DB_2A052CC263A4"
 ],
 "thumbnailUrl": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "yaw": 108.05,
   "class": "AdjacentPanorama",
   "backwardYaw": -52.95,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "yaw": -60.76,
   "class": "AdjacentPanorama",
   "backwardYaw": -131.83,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 18.15,
    "yawSpeed": 35.47,
    "targetYaw": 9.54,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 7.92,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -157.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D4C8F61F_C24A_042A_41BE_7A517ECC7F3F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 57.48,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.05,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 15.91,
  "class": "PanoramaCameraPosition",
  "pitch": 3.99
 },
 "id": "panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Escaleras Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_t.jpg"
  }
 ],
 "id": "panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A684DD2A_B28C_260F_41D9_A1A49E440FE4",
  "this.overlay_A6D0D2F2_B394_621F_41C1_6AE9CCDBB52A",
  "this.overlay_A710796D_B395_EE0A_41DA_0752F21353DE",
  "this.overlay_A712B490_B394_E61B_41A2_38730A7C0792",
  "this.overlay_A63E7C81_B3BC_66FA_41DD_AC4A0678A292",
  "this.overlay_90726D0E_B6DC_E235_41B5_EA8C6D07F42F",
  "this.overlay_91AF2A5B_B6D5_E6D3_41E0_9AFC4D063CAF",
  "this.overlay_915A78EA_B6D5_63FD_41C2_E6B76608423C"
 ],
 "thumbnailUrl": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "yaw": 146.95,
   "class": "AdjacentPanorama",
   "backwardYaw": 70.43,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": -126.7,
   "class": "AdjacentPanorama",
   "backwardYaw": -150.57,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "yaw": 49.53,
   "class": "AdjacentPanorama",
   "backwardYaw": 0.05,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -27.16,
   "class": "AdjacentPanorama",
   "backwardYaw": 132.33,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "yaw": 92.15,
   "class": "AdjacentPanorama",
   "backwardYaw": 133.96,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": -124.46,
   "class": "AdjacentPanorama",
   "backwardYaw": -157.73,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "items": [
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "class": "PlayList"
},
{
 "label": "Habitaci\u00f3n S 2 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_t.jpg"
  }
 ],
 "id": "panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A69FC48F_B2F4_2605_41B7_882B095D5499",
  "this.overlay_A6C350C4_B2F4_7E7B_41D9_ED8FC1575B96"
 ],
 "thumbnailUrl": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "yaw": -98.88,
   "class": "AdjacentPanorama",
   "backwardYaw": 52.42,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "label": "Pasillo 2 Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_t.jpg"
  }
 ],
 "id": "panorama_BCF67E95_B294_6205_41E6_4008DC577345",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A581B76C_B294_220B_41E2_C3CF23E91DAD",
  "this.overlay_A581EE63_B294_223E_41B8_ACDF70FE7F79",
  "this.overlay_A5FBFFD5_B294_2205_41D6_BBFDC66D6532",
  "this.overlay_A60710B8_B293_DE0B_41D7_6A53A84E287E",
  "this.overlay_A591AD1C_B29C_260B_41E5_1609317911D1",
  "this.overlay_A3CE488B_B594_1F6D_41E2_DAF2A43D9141"
 ],
 "thumbnailUrl": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -143.33,
   "class": "AdjacentPanorama",
   "backwardYaw": 61.25,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 42.27,
   "class": "AdjacentPanorama",
   "backwardYaw": -59.78,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 59.79,
   "class": "AdjacentPanorama",
   "backwardYaw": 155.54,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 167.07,
   "class": "AdjacentPanorama",
   "backwardYaw": 84.31,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 119.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0196180_C24A_7C15_41CE_89050311B300",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -120.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D3B69130_C24A_7C76_41C7_2B14AB7E9CE8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 71.07,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D616B3A5_C24A_7C1E_41A5_85E5D279E862",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 155.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1CE82E1_C24A_7C17_41E5_0ABB5C94B8D7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -106.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D16F1FC2_C24A_041A_41D9_743D31599B43",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 1 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_t.jpg"
  }
 ],
 "id": "panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A157E29E_B294_2207_41DB_A8AFF0017D7B",
  "this.overlay_A7E706F3_B294_621D_41E5_19D2605D803E",
  "this.overlay_A7515888_B294_2E0B_41E6_514DE0AF929D"
 ],
 "thumbnailUrl": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "yaw": 154.73,
   "class": "AdjacentPanorama",
   "backwardYaw": -83.52,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "yaw": 73.73,
   "class": "AdjacentPanorama",
   "backwardYaw": -95.09,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -107.82,
   "class": "AdjacentPanorama",
   "backwardYaw": 10.45,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 110.15,
  "pitch": 0,
  "hfov": 128
 },
 "id": "camera_D6E4B3ED_C24A_03EE_41CA_7E076BE58813",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 174.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D7AB8598_C24A_0436_4199_788D66704037",
 "automaticZoomSpeed": 10
},
{
 "label": "Ba\u00f1o Habitaci\u00f3n P Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_t.jpg"
  }
 ],
 "id": "panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -108.93,
   "class": "AdjacentPanorama",
   "backwardYaw": 93.27,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "yaw": 78.9,
   "class": "AdjacentPanorama",
   "backwardYaw": -67.45,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6E4DD05_B294_6605_41E2_C92C885527A9",
  "this.overlay_A63AE262_B294_223F_41E4_134E4A27BD52"
 ],
 "thumbnailUrl": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 36.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D07F8170_C24A_7CF6_4186_48D98DA8DDA8",
 "automaticZoomSpeed": 10
},
{
 "displayMovements": [
  {
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 1000
  },
  {
   "easing": "cubic_in_out",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 3000,
   "targetPitch": 6.35,
   "targetStereographicFactor": 0
  }
 ],
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -136.07,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -12.41,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 22.02,
  "class": "PanoramaCameraPosition",
  "pitch": 6.35
 },
 "id": "panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
 "displayOriginPosition": {
  "stereographicFactor": 1,
  "class": "RotationalCameraDisplayPosition",
  "yaw": 22.02,
  "pitch": -90,
  "hfov": 165
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 19.28,
    "yawSpeed": 37.74,
    "targetYaw": -177.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 12.53,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 119.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D4D7C63B_C24A_046A_41E4_FF87E63ACC92",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo 1 Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_t.jpg"
  }
 ],
 "id": "panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A603DF5C_B38C_620B_41E3_C7BBF4996339",
  "this.overlay_A678B64E_B38C_2207_41AF_1CA339D506C2",
  "this.overlay_A7C8F46D_B38C_E605_41DD_990F75553A1C",
  "this.overlay_A65300A6_B38C_5E07_41DD_924F60B4ABD4",
  "this.overlay_A6B399CE_B374_6E07_41BE_FD833F45CAD7",
  "this.overlay_A48E8D8C_B374_E60B_41E5_6A7AF3B00CE8",
  "this.overlay_823DF04B_B73B_E233_41B3_8431C48D263F",
  "this.overlay_A35A5AAB_B85A_A8AB_41E3_41E0D295A3AF",
  "this.overlay_A46E567C_B85B_9BAD_41A9_07E6F9FEF714"
 ],
 "thumbnailUrl": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": -59.78,
   "class": "AdjacentPanorama",
   "backwardYaw": 42.27,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -60.26,
   "class": "AdjacentPanorama",
   "backwardYaw": 61.19,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": -150.57,
   "class": "AdjacentPanorama",
   "backwardYaw": -126.7,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 176.29,
   "class": "AdjacentPanorama",
   "backwardYaw": 170.47,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": 122.62,
   "class": "AdjacentPanorama",
   "backwardYaw": 153.61,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": 20.09,
   "class": "AdjacentPanorama",
   "backwardYaw": -158.98,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 63.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D760F489_C24A_0416_41D0_4BB6812134B6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -50.12,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D09D520E_C24A_7C2A_41CF_8CFD3974B137",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -36.74,
  "class": "PanoramaCameraPosition",
  "pitch": -6.17
 },
 "id": "panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -175.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D50F16C6_C24A_041D_41CC_17092AD00427",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 52.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D3B7976C_C24A_04EE_41C5_D63AAECD40AF",
 "automaticZoomSpeed": 10
},
{
 "hfovMax": 130,
 "label": "Piscina 4",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_t.jpg"
  }
 ],
 "hfov": 360,
 "id": "panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
 "thumbnailUrl": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_t.jpg",
 "vfov": 180,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 66.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D162928B_C24A_7C2B_41CA_DE2EDA62EDE6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -118.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D47985DA_C24A_042A_4193_282136EF6C63",
 "automaticZoomSpeed": 10
},
{
 "label": "Zona Ropas",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_t.jpg"
  }
 ],
 "id": "panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 133.96,
   "class": "AdjacentPanorama",
   "backwardYaw": 92.15,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6614936_B38C_2E07_41C3_7B6F000998E3"
 ],
 "thumbnailUrl": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -161.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D7BB8599_C24A_0436_41E2_0039B5E7D803",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo Habitaci\u00f3n S Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_t.jpg"
  }
 ],
 "id": "panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -85.39,
   "class": "AdjacentPanorama",
   "backwardYaw": -83.22,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "yaw": 87.47,
   "class": "AdjacentPanorama",
   "backwardYaw": -127.24,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "yaw": -3.11,
   "class": "AdjacentPanorama",
   "backwardYaw": -132.19,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A12EA653_B2FC_221E_41C2_244655C0F12F",
  "this.overlay_A6B164AD_B2FC_6605_41C7_EEEB1ADB06D2",
  "this.overlay_A7BA2C5E_B2FC_2607_41E1_FDAC1ECFC99D",
  "this.overlay_A6F966CC_B2FC_220B_41E4_05F197B134E0"
 ],
 "thumbnailUrl": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 152.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1EDD2FC_C24A_7DEE_41C9_CAE14E727F93",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.84,
  "pitch": -1.09,
  "hfov": 130
 },
 "id": "panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 9.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6692363_C24A_7C1A_41D2_459B668057D0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 48.79,
  "class": "PanoramaCameraPosition",
  "pitch": -0.47
 },
 "id": "panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Jard\u00edn",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_ACE3D251_B574_13FD_41C9_3ED1B5AFE731"
 ],
 "thumbnailUrl": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -120.41,
   "class": "AdjacentPanorama",
   "backwardYaw": 71.62,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "label": "Ducha Habitaci\u00f3n S Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_t.jpg"
  }
 ],
 "id": "panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "yaw": -118.33,
   "class": "AdjacentPanorama",
   "backwardYaw": 48.26,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6E80BC6_B2FC_6206_41D6_C9A2D50EB19B",
  "this.overlay_A900D003_B6F4_E233_41E0_F870378D67EA"
 ],
 "thumbnailUrl": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -63.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0.14
 },
 "id": "panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -154.91,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D6F3D3FB_C24A_03EA_41E0_E83909AF61F7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 7.36,
    "yawSpeed": 13.78,
    "targetYaw": 45.2,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.78,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D52F56F0_C24A_05F6_41DC_4AF3C0B4203B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 156.53,
  "class": "PanoramaCameraPosition",
  "pitch": 3.87
 },
 "id": "panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 22.97,
    "yawSpeed": 45.14,
    "targetYaw": -177.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 12.53,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 179.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0E501DF_C24A_7C2B_41E5_95A9BBD2E841",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -148.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D78B2575_C24A_04FF_41E0_2AC087B1E475",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 75.66,
    "yawSpeed": 151.01,
    "targetYaw": -128.19,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.32,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -115.76,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -47.55,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.21,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D05EF79E_C24A_042A_41DA_91A779394FA4",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 105.21,
  "class": "PanoramaCameraPosition",
  "pitch": -0.61
 },
 "id": "panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -179.95,
  "pitch": 0,
  "hfov": 129
 },
 "id": "camera_D0A24F53_C24A_043A_41E5_D0738238426D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 53.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D40975E8_C24A_0416_41D9_448957433328",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -26.39,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D428A604_C24A_041D_41E3_21AEB61372B3",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 179.69,
  "class": "PanoramaCameraPosition",
  "pitch": -0.26
 },
 "id": "panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 98.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D18DA319_C24A_7C36_41E1_9E7F6375BB90",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 45.2,
  "pitch": -4.99,
  "hfov": 130
 },
 "id": "panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -103.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D7CE7518_C24A_0435_41D2_2DF47BFEFA5A",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6A05E9E_B294_2206_4198_456CF856B339",
  "this.overlay_A4C571CE_B294_7E07_41D1_47E11FFE9D44",
  "this.overlay_A10D4886_B294_6E07_41A8_FDEB9B15FA4E",
  "this.overlay_A4A048F5_B6CB_63D7_41E2_CADAF7431EB9"
 ],
 "thumbnailUrl": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": 91.25,
   "class": "AdjacentPanorama",
   "backwardYaw": 21.66,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "yaw": -0.85,
   "class": "AdjacentPanorama",
   "backwardYaw": -143.79,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "yaw": -60.71,
   "class": "AdjacentPanorama",
   "backwardYaw": -135.13,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "label": "Sala 1 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_t.jpg"
  }
 ],
 "id": "panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A15A77A4_B28C_223B_41D4_961EBEF9520D",
  "this.overlay_A1426398_B28C_220B_41CF_5CB6C0F48471",
  "this.overlay_A1539037_B2F3_FE05_41D2_2E8B1531C992"
 ],
 "thumbnailUrl": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": 59.91,
   "class": "AdjacentPanorama",
   "backwardYaw": 10.84,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "yaw": -26.04,
   "class": "AdjacentPanorama",
   "backwardYaw": -133.62,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -177.35,
  "class": "PanoramaCameraPosition",
  "pitch": 12.53
 },
 "id": "panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -151.42,
  "class": "PanoramaCameraPosition",
  "pitch": 9.02
 },
 "id": "panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -138.69,
  "class": "PanoramaCameraPosition",
  "pitch": -2.79
 },
 "id": "panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.06,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D12C0FF4_C24A_03FD_41E5_C097C19E8D16",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 4",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A1D575FB_B294_660D_41E6_37913D75622D"
 ],
 "thumbnailUrl": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": 20.87,
   "class": "AdjacentPanorama",
   "backwardYaw": 101.76,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -108.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D741D45C_C24A_042E_41DF_62FAA6B5124B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -31.74,
  "class": "PanoramaCameraPosition",
  "pitch": -1.08
 },
 "id": "panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 65.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D45AC5C0_C24A_0415_41CF_C820522619D0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -165.92,
  "class": "PanoramaCameraPosition",
  "pitch": -0.62
 },
 "id": "panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Piscina 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_AC08694A_B68C_31EF_41AF_C3038D9E6E8C",
  "this.overlay_A34189AB_B68C_10AD_41CD_E111D2202B16"
 ],
 "thumbnailUrl": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "yaw": -114.84,
   "class": "AdjacentPanorama",
   "backwardYaw": -147.51,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "yaw": 42.93,
   "class": "AdjacentPanorama",
   "backwardYaw": -170.83,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 29.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D11032B6_C24A_7C7D_41CE_045F8C5AEDC3",
 "automaticZoomSpeed": 10
},
{
 "label": "Comedor 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_t.jpg"
  }
 ],
 "id": "panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3F57B2F_B58C_31A5_41B1_C3B0D323E499",
  "this.overlay_A3ACC614_B58C_137B_41E1_232DBC95532F",
  "this.overlay_AC5CAF7E_B58C_11A7_41D5_27EB46ACF8EF",
  "this.overlay_A3FB9C62_B58C_17DF_41B2_2D2AE041D46F",
  "this.overlay_A3DD8EFE_B58C_70A7_41B4_362FA234601A",
  "this.overlay_A3D22D14_B594_117B_41E6_760EE19E43F8",
  "this.overlay_8B6BE10B_B75C_E233_41D1_BA093F4471F8"
 ],
 "thumbnailUrl": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 61.25,
   "class": "AdjacentPanorama",
   "backwardYaw": -143.33,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "yaw": -27.97,
   "class": "AdjacentPanorama",
   "backwardYaw": -149.79,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 61.19,
   "class": "AdjacentPanorama",
   "backwardYaw": -60.26,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -81.16,
   "class": "AdjacentPanorama",
   "backwardYaw": 36.75,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 123.19,
   "class": "AdjacentPanorama",
   "backwardYaw": 12.05,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "label": "Pasillo exterior 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3E15370_B58C_11BC_41E6_4C27776DF80D",
  "this.overlay_ACFC9CC8_B58C_10EB_41E2_29DDE0C71B35"
 ],
 "thumbnailUrl": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "yaw": 18.97,
   "class": "AdjacentPanorama",
   "backwardYaw": -174.39,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -90.44,
   "class": "AdjacentPanorama",
   "backwardYaw": -104.77,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -71.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6912416_C24A_043A_41E1_33E329F26EEB",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 30.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D00BB170_C24A_7CF6_41DD_282A887CAED0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -12.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D72F04E5_C24A_041E_41B0_5E42DFF40113",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -118.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D3FD90CE_C24A_7C2A_41E3_01802F564918",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 120.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D388D0DB_C24A_7C2B_41E4_E7888B06BBEF",
 "automaticZoomSpeed": 10
},
{
 "label": "Entrada 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3B03E31_B594_13BD_41D3_974DC13A7193",
  "this.overlay_A386E8BA_B594_70AC_41E4_A461BFCF4CD8",
  "this.overlay_A39912AD_B594_10A5_41DC_4C47E8D4EB26"
 ],
 "thumbnailUrl": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": 18.72,
   "class": "AdjacentPanorama",
   "backwardYaw": -116.43,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -150.88,
   "class": "AdjacentPanorama",
   "backwardYaw": -5.69,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "label": "Entrada",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_t.jpg"
  }
 ],
 "id": "panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3459C80_B594_175B_41B0_B5016DEACF26",
  "this.overlay_A3EC57E4_B594_10DB_41E4_457C674F15AD",
  "this.overlay_A84D05ED_B594_10A4_41A9_DBA42200C405",
  "this.overlay_A3985956_B594_11E7_41D6_B17047DD216F"
 ],
 "thumbnailUrl": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": -5.39,
   "class": "AdjacentPanorama",
   "backwardYaw": -113.28,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "yaw": -104.77,
   "class": "AdjacentPanorama",
   "backwardYaw": -90.44,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 153.61,
   "class": "AdjacentPanorama",
   "backwardYaw": 122.62,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "yaw": -5.69,
   "class": "AdjacentPanorama",
   "backwardYaw": -150.88,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 4.8,
    "yawSpeed": 8.64,
    "targetYaw": 45.2,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 14.63,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D637D3C4_C24A_7C1E_41C9_C71058F1E6C7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -43.46,
  "class": "PanoramaCameraPosition",
  "pitch": 1.12
 },
 "id": "panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -127.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6B2443D_C24A_046F_41DD_94257B995EC2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 15.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0F41EF1_C24A_05F6_41DD_F87663F3748F",
 "automaticZoomSpeed": 10
},
{
 "label": "Piscina 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A35DDE43_B694_13DD_41DA_B50490B813A5",
  "this.overlay_A34A230D_B69C_1164_41D2_523E9713FC6C"
 ],
 "thumbnailUrl": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": -52.95,
   "class": "AdjacentPanorama",
   "backwardYaw": 108.05,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -147.51,
   "class": "AdjacentPanorama",
   "backwardYaw": -114.84,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 145.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1ACE337_C24A_7C7A_41C5_AFD7F8B0C928",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 3.55,
    "yawSpeed": 6.12,
    "targetYaw": 22.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 6.35,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -136.07,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -12.41,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 46.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D4B3D68C_C24A_042D_41E0_8B7DA7795340",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -95.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D39CD0FA_C24A_7DF5_41DF_80DDD275E3CF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.57,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D0840F17_C24A_043A_41E6_743B6D9C4F3A",
 "automaticZoomSpeed": 10
},
{
 "label": "Solar",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_t.jpg"
  }
 ],
 "id": "panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A35C1888_B69C_3F6B_41DC_F150EEDBD9B3"
 ],
 "thumbnailUrl": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": -131.83,
   "class": "AdjacentPanorama",
   "backwardYaw": -60.76,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 96.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D7DDB52E_C24A_046A_41DF_9B28575DF011",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 4 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_t.jpg"
  }
 ],
 "id": "panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A16BEE30_B28C_621A_41B4_A0885BB8C271",
  "this.overlay_ACA27E65_B6FC_DEF7_41E6_D85BF0C0F9B7"
 ],
 "thumbnailUrl": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "yaw": 40.71,
   "class": "AdjacentPanorama",
   "backwardYaw": 114.67,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -33.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D081E1FE_C24A_7FEA_41DA_256681140EC6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.55,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D7FCC556_C24A_043A_41E5_E96AA7F69E90",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 6.51,
    "yawSpeed": 12.07,
    "targetYaw": -177.35,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 12.53,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -88.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D4936671_C24A_04F6_41C6_2D7EAC6F6B71",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -54.41,
  "pitch": -3.06,
  "hfov": 128
 },
 "id": "panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 115.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0AB221E_C24A_7C2A_41C2_1FEEAD870C49",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 19,
  "class": "PanoramaCameraPosition",
  "pitch": 4.06
 },
 "id": "panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 3 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_t.jpg"
  }
 ],
 "id": "panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6C644CF_B2F5_E605_41C2_03F4FA4A3D05",
  "this.overlay_A11C2CBC_B2F4_660B_41C3_9754038D0D88"
 ],
 "thumbnailUrl": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "yaw": -164.02,
   "class": "AdjacentPanorama",
   "backwardYaw": -34.84,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 130.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1CC201E_C24A_7C2A_417D_9B5DA363DA3C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 29.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D093BF35_C24A_047E_41C2_8D1F5F7C8E2A",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 7.64,
    "yawSpeed": 14.34,
    "targetYaw": 45.2,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -8.63,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D0DB21CF_C24A_7C2A_41C0_9575F8BCD420",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 81.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0C8EE73_C24A_04FB_41DC_CCF1CA122F6F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -22.39,
  "pitch": -5.46,
  "hfov": 129
 },
 "id": "panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -101.1,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D0619164_C24A_7C1E_41E0_7536BA60EA21",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.46,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D38140E2_C24A_7C1A_41E4_3AA8A709D9DD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 123.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D79C9589_C24A_0416_41E6_91EF11648251",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -41.19,
  "class": "PanoramaCameraPosition",
  "pitch": -0.38
 },
 "id": "panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Cocina 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_t.jpg"
  }
 ],
 "id": "panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A623A739_B37C_620D_41BA_EC1F16031DAE"
 ],
 "thumbnailUrl": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": -64.58,
   "class": "AdjacentPanorama",
   "backwardYaw": 108.85,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 72.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6780374_C24A_7CFD_41E5_0493851A7E85",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.77,
  "pitch": -2.99,
  "hfov": 127
 },
 "id": "panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -167.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D02371A5_C24A_7C1E_41B4_BA12FE2118C9",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -56.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D73E44F3_C24A_05FA_41CF_69D00E086945",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n 2 Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_t.jpg"
  }
 ],
 "id": "panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A66E5240_B3B4_227A_41D4_EFF40490AE9A"
 ],
 "thumbnailUrl": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -50.11,
   "class": "AdjacentPanorama",
   "backwardYaw": 117.82,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -87.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D683F409_C24A_0416_41E5_29A231973AED",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -119.81,
  "class": "PanoramaCameraPosition",
  "pitch": 9.37
 },
 "id": "panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 129.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D13C7010_C24A_7C35_41D6_9E66AF33545E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.89,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D0CEF1BF_C24A_7C6A_41C5_DBBF0990FA89",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 32.97,
  "class": "PanoramaCameraPosition",
  "pitch": 2.87
 },
 "id": "panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Escaleras Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_t.jpg"
  }
 ],
 "id": "panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -23.44,
   "class": "AdjacentPanorama",
   "backwardYaw": -165.37,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 0.05,
   "class": "AdjacentPanorama",
   "backwardYaw": 49.53,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6E6238D_B28C_220A_41E3_B57DEA725058",
  "this.overlay_A6CDE92C_B28C_2E0A_4194_F30F37CAF4C8"
 ],
 "thumbnailUrl": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -137.07,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1DE42EF_C24A_7DEB_41E5_E45A13808705",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -47.67,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D0B19F66_C24A_041A_41B9_8EFE336552B6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 84.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D7ED9549_C24A_0416_41C3_73B8DF0E0A2C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -159.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0B6A255_C24A_7C3E_41CB_65D682C0EB09",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_t.jpg"
  }
 ],
 "id": "panorama_BCE37E62_B294_223E_41D5_683710308D0B",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3E111D5_B594_10E5_41C5_6E273440BC6E",
  "this.overlay_A3427BAC_B594_F0AB_41E3_584E8B987CCD",
  "this.overlay_A3FBFB39_B594_11AD_41D3_81E8CDCC1CFB",
  "this.overlay_F45FECC5_B754_A237_41E4_F91A927F2A47",
  "this.overlay_FE64F1A8_B757_627D_41E3_AD93A9EDCAFA"
 ],
 "thumbnailUrl": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 84.31,
   "class": "AdjacentPanorama",
   "backwardYaw": 167.07,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": 12.05,
   "class": "AdjacentPanorama",
   "backwardYaw": 123.19,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "yaw": -140.11,
   "class": "AdjacentPanorama",
   "backwardYaw": 76.56,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 47.81,
  "pitch": 0,
  "hfov": 127
 },
 "id": "camera_D04D576C_C24A_04EE_41E2_0DCFA6A77A84",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -3.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D3E1E0AE_C24A_7C6A_41D5_D23C6374A5E3",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 46.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D57026C2_C24A_041A_41C5_D20A2E8C2D87",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 63.01,
    "yawSpeed": 125.6,
    "targetYaw": 15.91,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 3.99,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 57.48,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.05,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -159.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D4F45657_C24A_043B_41D9_CB14CB9EDCDD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 152.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1EBA03F_C24A_7C6A_41CA_6E62107F9A53",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -161.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6A2C42C_C24A_046D_41E1_2A7265B4D57F",
 "automaticZoomSpeed": 10
},
{
 "label": "Cocina",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_t.jpg"
  }
 ],
 "id": "panorama_BCF619F2_B294_2E1F_41E2_371766686094",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6DC1EB1_B374_221D_41DE_D83EFBFFB4E6",
  "this.overlay_A7563243_B374_227D_41C1_948A1F8F4998",
  "this.overlay_8FA0D115_B74B_6254_41E5_98CB9C7406C4",
  "this.overlay_A3C42F48_B856_69D5_41DF_8253C2CD632F"
 ],
 "thumbnailUrl": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "yaw": 108.85,
   "class": "AdjacentPanorama",
   "backwardYaw": -64.58,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": -157.73,
   "class": "AdjacentPanorama",
   "backwardYaw": -124.46,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": -158.98,
   "class": "AdjacentPanorama",
   "backwardYaw": 20.09,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 75.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D13F62D2_C24A_7C3A_41C7_92479131F3B0",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n 3 Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_t.jpg"
  }
 ],
 "id": "panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A639D286_B38C_2207_41E0_B4CD2BCB7DDA",
  "this.overlay_84CA4BFE_B73C_A5D5_41B3_056930E024CD"
 ],
 "thumbnailUrl": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -49.2,
   "class": "AdjacentPanorama",
   "backwardYaw": 31.2,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 97.3,
  "class": "PanoramaCameraPosition",
  "pitch": 3.18
 },
 "id": "panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo Habitaci\u00f3n P Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": 10.45,
   "class": "AdjacentPanorama",
   "backwardYaw": -107.82,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -164.86,
   "class": "AdjacentPanorama",
   "backwardYaw": 92.36,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "yaw": 93.27,
   "class": "AdjacentPanorama",
   "backwardYaw": -108.93,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A111A483_B293_E6FD_41E0_493A02B80FB7",
  "this.overlay_A6D36010_B294_FE1A_41C2_787255E488AB",
  "this.overlay_A17D4916_B295_EE07_41E1_73CF3F266C33"
 ],
 "thumbnailUrl": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -115.76,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -47.55,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -128.19,
  "pitch": -14.32,
  "hfov": 130
 },
 "id": "panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.53,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D0C61E98_C24A_0436_41E1_486631C58B5B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 139.73,
  "class": "PanoramaCameraPosition",
  "pitch": -2.87
 },
 "id": "panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -118.72,
  "class": "PanoramaCameraPosition",
  "pitch": 1.94
 },
 "id": "panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 43.2,
  "pitch": -3.92,
  "hfov": 124
 },
 "id": "panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 29.99,
  "class": "PanoramaCameraPosition",
  "pitch": -7.19
 },
 "id": "panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -104.27,
  "pitch": -0.96,
  "hfov": 130
 },
 "id": "panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -65.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D71F74C1_C24A_0417_41B9_AF61960CD86B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 153.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0E6CED1_C24A_0437_41D2_9A6CC4EAD8EE",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.55,
  "pitch": 0,
  "hfov": 129
 },
 "id": "camera_D11EFFEE_C24A_03EA_41C9_A2E9F4632E25",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 56.83,
  "class": "PanoramaCameraPosition",
  "pitch": 12.47
 },
 "id": "panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 48.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1523279_C24A_7CF7_41D9_C37D64119D53",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -33.14,
  "class": "PanoramaCameraPosition",
  "pitch": 9.64
 },
 "id": "panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 119.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D7518476_C24A_04FD_41E7_3B6BA84FDEB9",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -71.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D44925B3_C24A_047B_41E4_DD9C1A24E264",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.06,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D0D66EB7_C24A_047A_41B2_D93319BD86DA",
 "automaticZoomSpeed": 10
},
{
 "label": "Ba\u00f1o Social Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_t.jpg"
  }
 ],
 "id": "panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 70.43,
   "class": "AdjacentPanorama",
   "backwardYaw": 146.95,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 75.27,
   "class": "AdjacentPanorama",
   "backwardYaw": 129.88,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6769466_B38C_6607_41B2_7DAC595DA138",
  "this.overlay_848EA393_B73F_6653_41C1_9494860D7408"
 ],
 "thumbnailUrl": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -139.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D17F2FD1_C24A_0436_41CF_98CC6952C181",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n 1 Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_t.jpg"
  }
 ],
 "id": "panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A66A75AE_B3BC_2607_41E0_99495DC1CE0C",
  "this.overlay_A66EEB8F_B3B4_2206_41D9_B472B986BFC2",
  "this.overlay_A65E32F1_B3B4_E21A_41E5_162020AE7575"
 ],
 "thumbnailUrl": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -147.58,
   "class": "AdjacentPanorama",
   "backwardYaw": -55.94,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "yaw": 117.82,
   "class": "AdjacentPanorama",
   "backwardYaw": -50.11,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "yaw": 31.2,
   "class": "AdjacentPanorama",
   "backwardYaw": -49.2,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "label": "Pasillo Habitaci\u00f3n Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_t.jpg"
  }
 ],
 "id": "panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 132.33,
   "class": "AdjacentPanorama",
   "backwardYaw": -27.16,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "yaw": 25.09,
   "class": "AdjacentPanorama",
   "backwardYaw": -86.19,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "yaw": 129.88,
   "class": "AdjacentPanorama",
   "backwardYaw": 75.27,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -55.94,
   "class": "AdjacentPanorama",
   "backwardYaw": -147.58,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 170.47,
   "class": "AdjacentPanorama",
   "backwardYaw": 176.29,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 155.54,
   "class": "AdjacentPanorama",
   "backwardYaw": 59.79,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6539B97_B3BC_2206_41A5_D82F19533741",
  "this.overlay_A638CFC8_B3BC_E20B_41E4_7C1C4EF0DD77",
  "this.overlay_A789B760_B3BC_223B_41E4_5B607861AFEF",
  "this.overlay_9ED4A39C_B6D4_E655_41DB_8A29F7AA08A5",
  "this.overlay_9CDEF6CD_B6CB_AE34_41DA_8C081869FC02",
  "this.overlay_9E8069F2_B6CC_A5ED_41E4_CB4B70F88FB0"
 ],
 "thumbnailUrl": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "label": "Ducha Habitaci\u00f3n Piso 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_t.jpg"
  }
 ],
 "id": "panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "yaw": -69.85,
   "class": "AdjacentPanorama",
   "backwardYaw": 100.94,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A79FC131_B3BD_DE1D_41CB_6D0DB5D6FBA8",
  "this.overlay_A6640D08_B3BC_260B_41DC_5121CDCA6EA7"
 ],
 "thumbnailUrl": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 32.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D6595361_C24A_7C16_41D1_2DCA825C5D29",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 27.32,
    "yawSpeed": 53.89,
    "targetYaw": 45.2,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.16,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D55166A4_C24A_041E_41E5_0125F0FB4068",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.26,
  "pitch": -8.54,
  "hfov": 129
 },
 "id": "panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo exterior 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3BE4913_B58C_117D_41D2_272BE5657E02",
  "this.overlay_AC6CF670_B58C_13BB_41E5_7D3E6F2E0DCC"
 ],
 "thumbnailUrl": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "yaw": -174.39,
   "class": "AdjacentPanorama",
   "backwardYaw": 18.97,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "yaw": 4.53,
   "class": "AdjacentPanorama",
   "backwardYaw": 52.97,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -131.74,
  "pitch": 0,
  "hfov": 127
 },
 "id": "camera_D70F84B0_C24A_0476_41CC_A4B03E06D300",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 3.39,
    "yawSpeed": 5.8,
    "targetYaw": 22.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 6.35,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -136.07,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -12.41,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 44.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D068B7C1_C24A_0417_41AE_284A50BD1488",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -24.61,
  "pitch": -0.74,
  "hfov": 124
 },
 "id": "panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -57.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D100729C_C24A_7C2E_41D1_75F272116CB4",
 "automaticZoomSpeed": 10
},
{
 "label": "Entrada Piscina",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3469FE2_B68C_10DC_41DF_6B5634CED5FB",
  "this.overlay_A327DE79_B68C_33AD_4193_D0A50D92FF3D"
 ],
 "thumbnailUrl": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": -56.55,
   "class": "AdjacentPanorama",
   "backwardYaw": -24.28,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -170.83,
   "class": "AdjacentPanorama",
   "backwardYaw": 42.93,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "mouseControlMode": "drag_rotation",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleHotspots": "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "touchControlMode": "drag_acceleration"
},
{
 "label": "Escaleras Terraza",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -113.09,
   "class": "AdjacentPanorama",
   "backwardYaw": 171.37,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": -143.79,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.85,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A116EB46_B29C_6207_41E0_442B55E89DA4",
  "this.overlay_A6EC268E_B29C_2207_41DB_EF3BE4C5AF26"
 ],
 "thumbnailUrl": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 168.66,
  "class": "PanoramaCameraPosition",
  "pitch": 3.13
 },
 "id": "panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 2 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_t.jpg"
  }
 ],
 "id": "panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6F613F2_B2F4_221F_41C4_11EC6A5D6BC3",
  "this.overlay_A66E538A_B2F4_E20F_41BD_C6E949D03F29"
 ],
 "thumbnailUrl": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "yaw": -133.62,
   "class": "AdjacentPanorama",
   "backwardYaw": -26.04,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "yaw": -34.84,
   "class": "AdjacentPanorama",
   "backwardYaw": -164.02,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 61.67,
  "pitch": 0,
  "hfov": 128
 },
 "id": "camera_D03081AF_C24A_7C6A_41D1_86AFF56E416C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -0.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D19B1328_C24A_7C16_41E2_328FE1EABD41",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 5.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D12F52C4_C24A_7C1D_41CC_42D5F57728D5",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 51.65,
  "class": "PanoramaCameraPosition",
  "pitch": 3.53
 },
 "id": "panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -86.73,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D10EEFE2_C24A_041A_41E7_0B8BDBD0483F",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A225C117_B29C_DE05_41E0_0C4CE54E91DE",
  "this.overlay_A63B2BE4_B6D5_A5F4_4193_343AED842967"
 ],
 "thumbnailUrl": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": -133.51,
   "class": "AdjacentPanorama",
   "backwardYaw": 22.45,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": -135.13,
   "class": "AdjacentPanorama",
   "backwardYaw": -60.71,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.59,
  "pitch": -8.8,
  "hfov": 130
 },
 "id": "panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.53,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D418D5EC_C24A_07EE_41E5_BE4182B8DF40",
 "automaticZoomSpeed": 10
},
{
 "label": "Patio 1",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_ACAA9B16_B58C_3164_41D1_D1A4B60E77C1",
  "this.overlay_A3AFA20C_B58C_136B_41DF_2BF4D20F8B28",
  "this.overlay_F9256439_B777_625C_41E6_18134498E027"
 ],
 "thumbnailUrl": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "yaw": 52.97,
   "class": "AdjacentPanorama",
   "backwardYaw": 4.53,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": 179.83,
   "class": "AdjacentPanorama",
   "backwardYaw": -18.07,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "label": "Habitaci\u00f3n S 1 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_t.jpg"
  }
 ],
 "id": "panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6F9F7B9_B2FC_220D_41E4_E34396F194F3",
  "this.overlay_A6EB9B77_B2FC_2205_41E0_A090AA0C43CD"
 ],
 "thumbnailUrl": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "yaw": 52.42,
   "class": "AdjacentPanorama",
   "backwardYaw": -98.88,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -127.24,
   "class": "AdjacentPanorama",
   "backwardYaw": 87.47,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -127.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1DBB023_C24A_7C1A_41E4_31054DABE584",
 "automaticZoomSpeed": 10
},
{
 "label": "Comedor 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_t.jpg"
  }
 ],
 "id": "panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3CA1829_B58C_1FAC_41D2_7D150963EF5A",
  "this.overlay_F74E4707_B75C_AE33_41CC_032D81451266"
 ],
 "thumbnailUrl": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -149.79,
   "class": "AdjacentPanorama",
   "backwardYaw": -27.97,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "label": "Sala 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_t.jpg"
  }
 ],
 "id": "panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A3C66036_B594_EFA7_41A2_11A03EB23B88",
  "this.overlay_A3A4236E_B594_31A7_41E3_F3D7A5338CCC",
  "this.overlay_AC691B70_B594_11BB_41E0_91D054FDD64E",
  "this.overlay_F3F410E6_B755_63F5_41B3_43A112BBD5A7",
  "this.overlay_FFF6FB46_B74D_A634_41D1_3C89F5F80468"
 ],
 "thumbnailUrl": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 76.56,
   "class": "AdjacentPanorama",
   "backwardYaw": -140.11,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "class": "AdjacentPanorama"
  }
 ],
 "partial": false
},
{
 "label": "Ba\u00f1o Habitaci\u00f3n S Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_t.jpg"
  }
 ],
 "id": "panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "yaw": 48.26,
   "class": "AdjacentPanorama",
   "backwardYaw": -118.33,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -132.19,
   "class": "AdjacentPanorama",
   "backwardYaw": -3.11,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A11965BD_B2FC_660A_41B5_37919A2C967C",
  "this.overlay_A6F696B6_B2FC_E206_41E4_B4B1380586BA"
 ],
 "thumbnailUrl": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_t.jpg",
 "hfov": 360,
 "pitch": 0,
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -79.1,
  "pitch": -1.01,
  "hfov": 128
 },
 "id": "panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 127.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D145E25A_C24A_7C35_41C3_D0463FA2CCF2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 21.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D4278613_C24A_043B_41A9_0F3A85263394",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 39.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0555156_C24A_7C3A_41D5_FC1A81EC0E9D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 22.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D151EFA5_C24A_041E_41D0_FC08D741DA93",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 2 Piso 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_t.jpg"
  }
 ],
 "id": "panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6A7899D_B28C_2E05_41E4_2CD66509294C"
 ],
 "thumbnailUrl": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": -83.52,
   "class": "AdjacentPanorama",
   "backwardYaw": 154.73,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 55.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0B9123E_C24A_7C6A_41D4_F03FEB7BEAAD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.32,
    "yawSpeed": 33.79,
    "targetYaw": 45.2,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "path": "shortest"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "easing": "cubic_in_out",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "path": "shortest"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.64,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D608138E_C24A_7C2A_41E0_A74E59848FF1",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -58.3,
  "class": "PanoramaCameraPosition",
  "pitch": -3.88
 },
 "id": "panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 114.81,
  "pitch": -5.87,
  "hfov": 130
 },
 "id": "panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -11.09,
  "class": "PanoramaCameraPosition",
  "pitch": -2.49
 },
 "id": "panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 89.56,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1700299_C24A_7C36_41DD_9884003196BC",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 138.42,
  "class": "PanoramaCameraPosition",
  "pitch": 1.77
 },
 "id": "panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Patio 2",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_t.jpg",
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/0/{row}_{column}.jpg",
      "colCount": 8,
      "rowCount": 8,
      "tags": "ondemand",
      "width": 4096,
      "class": "TiledImageResourceLevel",
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/1/{row}_{column}.jpg",
      "colCount": 4,
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
 "pitch": 0,
 "vfov": 180,
 "hfovMax": 130,
 "overlays": [
  "this.overlay_AEF6F510_B58C_117B_41D8_422DB0D5A80D",
  "this.overlay_AC6E0ACB_B58C_30EC_41E2_41132314EFCA",
  "this.overlay_AC95861D_B58C_1365_41E3_7692D9258B2E"
 ],
 "thumbnailUrl": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_t.jpg",
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "yaw": 71.62,
   "class": "AdjacentPanorama",
   "backwardYaw": -120.41,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": 36.75,
   "class": "AdjacentPanorama",
   "backwardYaw": -81.16,
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "yaw": -18.07,
   "class": "AdjacentPanorama",
   "backwardYaw": 179.83,
   "distance": 1
  }
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -143.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D0153198_C24A_7C35_4141_582839F8A708",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -137.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0.26
 },
 "id": "panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 52, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.04,
  "pitch": 0,
  "hfov": 130
 },
 "id": "camera_D1405F92_C24A_0435_41E0_3633669A755E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 174.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D77054A1_C24A_0416_41E2_68B93FBA53D1",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -125.19,
  "class": "PanoramaCameraPosition",
  "pitch": 7.16
 },
 "id": "panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 59.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D1FDE30A_C24A_7C2A_41CF_9B88A683FDD0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -137.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D46A75CB_C24A_042B_41C7_0713A4C79B0F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -93.88,
  "class": "PanoramaCameraPosition",
  "pitch": 1.97
 },
 "id": "panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 106.74,
  "class": "PanoramaCameraPosition",
  "pitch": -3.26
 },
 "id": "panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.14,
  "pitch": 0,
  "hfov": 124
 },
 "id": "camera_D04F0130_C24A_7C76_41D9_15D9963B9544",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": 161.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_D51F16E0_C24A_0415_41D5_D0F87A2D9891",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ]
 },
 "initialPosition": {
  "yaw": -95.64,
  "class": "PanoramaCameraPosition",
  "pitch": 10.2
 },
 "id": "panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 46, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "class": "PlayList"
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "maxWidth": 1920,
 "progressBarOpacity": 1,
 "class": "ViewerArea",
 "left": 0,
 "toolTipBorderSize": 1,
 "id": "MainViewer",
 "toolTipPaddingRight": 10,
 "paddingBottom": 0,
 "progressBorderRadius": 0,
 "progressBorderSize": 0,
 "toolTipPaddingTop": 20,
 "right": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 10,
 "playbackBarBorderColor": "#FFFFFF",
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "minHeight": 480,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "minWidth": 854,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "13px",
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 10,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "maxHeight": 1080,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "top": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "bottom": "0%",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "transitionMode": "fade_out_fade_in",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionColor": "#FF6600",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF"
},
{
 "children": [
  "this.Label_0C5F13A8_3BA0_A6FF_41BD_E3D21CFCE151",
  "this.Label_0C5F23A8_3BA0_A6FF_419F_468451E37918"
 ],
 "class": "Container",
 "left": 30,
 "width": 271,
 "id": "Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "height": 97,
 "bottom": 20,
 "minWidth": 1,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--STICKER"
 },
 "paddingLeft": 0,
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1"
 ],
 "backgroundOpacity": 1,
 "right": "0%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#00CBDA",
  "#3538E8",
  "#B304E4"
 ],
 "backgroundColorRatios": [
  0,
  0.48,
  1
 ],
 "height": 60,
 "minWidth": 1,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "horizontal",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--BUTTON SET"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "width": 60,
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "paddingBottom": 0,
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A"
 ],
 "backgroundOpacity": 1,
 "right": 15,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "minHeight": 1,
 "top": 62,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0.02
 ],
 "height": 300,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "vertical"
},
{
 "children": [
  "this.IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
  "this.IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
  "this.IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
  "this.IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93"
 ],
 "class": "Container",
 "left": "0%",
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "width": "100%",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 30,
 "propagateClick": true,
 "height": 90,
 "bottom": "0%",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 3,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "backgroundOpacity": 0.6,
 "right": "0%",
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---INFO photo"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "backgroundOpacity": 0.6,
 "right": "0%",
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PANORAMA LIST"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "backgroundOpacity": 0.6,
 "right": "0%",
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---LOCATION"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "backgroundOpacity": 0.6,
 "right": "0%",
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---FLOORPLAN"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "backgroundOpacity": 0.6,
 "right": "0%",
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PHOTOALBUM"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "0%",
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "backgroundOpacity": 0.6,
 "right": "0%",
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---REALTOR"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#04A3E1",
 "layout": "absolute"
},
{
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "class": "Button",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "mode": "toggle",
 "pressedIconHeight": 30,
 "height": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "pressedRollOverIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed_rollover.png",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal"
},
{
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "class": "Button",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "mode": "toggle",
 "pressedIconHeight": 30,
 "height": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "pressedRollOverIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed_rollover.png",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "Button Settings Mute"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A, this.camera_D6E4B3ED_C24A_03EE_41CA_7E076BE58813); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD096293_BDE2_CE0A_41E1_4AF8D44D4065",
   "pitch": -49.77,
   "yaw": 100.94,
   "hfov": 16.96,
   "distance": 100
  }
 ],
 "id": "overlay_A677D88F_B3BC_2E05_41D7_EFC39973BFD7",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 100.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.77,
   "hfov": 16.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_D6F3D3FB_C24A_03EA_41E0_E83909AF61F7); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD09C293_BDE2_CE0A_41D1_5510D52987C5",
   "pitch": -48.33,
   "yaw": -86.19,
   "hfov": 17.46,
   "distance": 100
  }
 ],
 "id": "overlay_A66464B6_B3BC_E606_41CA_DE4D2DC1AF23",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -86.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.33,
   "hfov": 17.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_D4936671_C24A_04F6_41C6_2D7EAC6F6B71); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD221285_BDE2_CE0E_418D_2673A3FB725F",
   "pitch": -16.58,
   "yaw": 21.66,
   "hfov": 16.65,
   "distance": 100
  }
 ],
 "id": "overlay_A1102A1B_B294_620E_41C6_0AFD68920E5F",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 21.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.58,
   "hfov": 16.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708, this.camera_D4F45657_C24A_043B_41D9_CB14CB9EDCDD); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD22D286_BDE2_CE0A_4191_07AAF07B55D1",
   "pitch": -29.29,
   "yaw": 101.76,
   "hfov": 23.79,
   "distance": 100
  }
 ],
 "id": "overlay_A6E69AE0_B294_223B_41E1_8EA28F4153E5",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 101.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.29,
   "hfov": 23.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E, this.camera_D4B3D68C_C24A_042D_41E0_8B7DA7795340); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD22B286_BDE2_CE0A_41C8_498AE8EA25DA",
   "pitch": -8.91,
   "yaw": 22.45,
   "hfov": 4.56,
   "distance": 100
  }
 ],
 "id": "overlay_A118C749_B294_620D_41D9_311280482196",
 "data": {
  "label": "Arrow 02c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 22.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.91,
   "hfov": 4.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_D16F1FC2_C24A_041A_41D9_743D31599B43); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3B128A_BDE2_CE1A_41D0_2F6A86F5CE15",
   "pitch": -41.27,
   "yaw": -95.09,
   "hfov": 16.56,
   "distance": 100
  }
 ],
 "id": "overlay_A15EDDED_B28F_E605_41E3_95E1B137D21C",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -95.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.27,
   "hfov": 16.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B, this.camera_D17F2FD1_C24A_0436_41CF_98CC6952C181); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3BF28A_BDE2_CE1A_41E4_CDC79572FAD6",
   "pitch": -33.28,
   "yaw": 114.67,
   "hfov": 18.41,
   "distance": 100
  }
 ],
 "id": "overlay_A6361CB7_B28C_2605_41D8_2365410F49EF",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 114.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.28,
   "hfov": 18.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C, this.camera_D7BB8599_C24A_0436_41E2_0039B5E7D803); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD15F2A7_BDE2_CE0A_41E4_7DDFC11F80C7",
   "pitch": -15.38,
   "yaw": -116.43,
   "hfov": 8.81,
   "distance": 100
  }
 ],
 "id": "overlay_A355CF73_B574_11BD_41E0_5D4FB1E55AEB",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -116.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.38,
   "hfov": 8.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_D7AB8598_C24A_0436_4199_788D66704037); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1472A7_BDE2_CE0A_41C7_37F64742BF16",
   "pitch": -8.95,
   "yaw": -113.28,
   "hfov": 4.4,
   "distance": 100
  }
 ],
 "id": "overlay_ACD895B7_B574_10A5_41C0_121645A3CBB6",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -113.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.95,
   "hfov": 4.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C, this.camera_D79C9589_C24A_0416_41E6_91EF11648251); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD14F2A8_BDE2_CE06_41CF_E961FCBE35FC",
   "pitch": -8.67,
   "yaw": -24.28,
   "hfov": 8.69,
   "distance": 100
  }
 ],
 "id": "overlay_A3613C37_B574_37A5_41D8_B29C6D57DA6F",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -24.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.67,
   "hfov": 8.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_D05B814B_C24A_7C2B_41D7_2B295A4D7210); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD27F287_BDE2_CE0A_41E3_F74EA0E34C83",
   "pitch": -30.73,
   "yaw": -83.22,
   "hfov": 15.18,
   "distance": 100
  }
 ],
 "id": "overlay_A11A94FB_B29C_E60D_41D0_8D8502D57E81",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -83.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.73,
   "hfov": 15.18
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28, this.camera_D3B69130_C24A_7C76_41C7_2B14AB7E9CE8); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 23.06,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_1_0.png",
      "width": 768,
      "class": "ImageResourceLevel",
      "height": 755
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.24,
   "yaw": 10.84
  }
 ],
 "id": "overlay_A1456C90_B29C_261B_41BD_F9A10C71356D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 10.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.24,
   "hfov": 23.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_D04F0130_C24A_7C76_41D9_15D9963B9544); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD261287_BDE2_CE0A_41D1_AE5E3051BDA8",
   "pitch": -43.77,
   "yaw": 92.36,
   "hfov": 18.68,
   "distance": 100
  }
 ],
 "id": "overlay_A11564EB_B29C_260D_41D5_6A4CE8C0A213",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 92.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.77,
   "hfov": 18.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943, this.camera_D3A8C101_C24A_7C16_41DD_835BB48147D6); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD26C287_BDE2_CE0A_41E0_9F88616932B6",
   "pitch": 20.1,
   "yaw": 171.37,
   "hfov": 19.74,
   "distance": 100
  }
 ],
 "id": "overlay_A2A67653_B6CF_AED3_41E6_804ACA3BFEA0",
 "data": {
  "label": "Circle Arrow 05"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 171.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 20.1,
   "hfov": 19.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A, this.camera_D3BBA121_C24A_7C16_41DD_8CADB56D07B7); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD268287_BDE2_CE0A_41E2_BC3256944030",
   "pitch": -32.61,
   "yaw": -165.37,
   "hfov": 14.69,
   "distance": 100
  }
 ],
 "id": "overlay_A3E7C0A3_B6CC_A273_41D1_B060EF130F1E",
 "data": {
  "label": "Circle Generic 04"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -165.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.61,
   "hfov": 14.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A, this.camera_D0619164_C24A_7C1E_41E0_7536BA60EA21); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD396289_BDE2_CE06_41E1_F2086A1C1618",
   "pitch": -46.69,
   "yaw": -67.45,
   "hfov": 14.65,
   "distance": 100
  }
 ],
 "id": "overlay_A151E8BA_B294_EE0C_41D7_D78A106E34D6",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -67.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -46.69,
   "hfov": 14.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.04,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_1_0.png",
      "width": 366,
      "class": "ImageResourceLevel",
      "height": 391
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.05,
   "yaw": -73.07
  }
 ],
 "id": "overlay_A1330E00_B2F4_65FB_41DB_A2656859E799",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -73.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.05,
   "hfov": 11.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3, this.camera_D1523279_C24A_7CF7_41D9_C37D64119D53); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ACE802AA_BDE2_CE1A_41D4_75958B53831E",
   "pitch": 0.71,
   "yaw": -60.76,
   "hfov": 10.76,
   "distance": 100
  }
 ],
 "id": "overlay_A32203F1_B69C_10BD_41E6_675DD40D1DD6",
 "data": {
  "label": "Circle Arrow 05"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -60.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.71,
   "hfov": 10.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63, this.camera_D145E25A_C24A_7C35_41C3_D0463FA2CCF2); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ACE8B2AA_BDE2_CE1A_41E4_5B0D5AF291E4",
   "pitch": -8.34,
   "yaw": 108.05,
   "hfov": 9.5,
   "distance": 100
  }
 ],
 "id": "overlay_ACAC7056_B69C_2FE7_41DB_2A052CC263A4",
 "data": {
  "label": "Arrow 05"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 108.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_1_0_0_map.gif",
      "width": 30,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.34,
   "hfov": 9.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A, this.camera_D0A24F53_C24A_043A_41E5_D0738238426D); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD30E28F_BDE2_CE1A_41DB_A7CC68CB998B",
   "pitch": 16.21,
   "yaw": 49.53,
   "hfov": 11.52,
   "distance": 100
  }
 ],
 "id": "overlay_A684DD2A_B28C_260F_41D9_A1A49E440FE4",
 "data": {
  "label": "Circle Generic 04"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 49.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 16.21,
   "hfov": 11.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F, this.camera_D1405F92_C24A_0435_41E0_3633669A755E); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD33728F_BDE2_CE1A_41C9_0F370E6C4D86",
   "pitch": -40.01,
   "yaw": 92.15,
   "hfov": 9.23,
   "distance": 50
  }
 ],
 "id": "overlay_A6D0D2F2_B394_621F_41C1_6AE9CCDBB52A",
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 92.15,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_1_0_0_map.gif",
      "width": 24,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.01,
   "hfov": 9.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4, this.camera_D0840F17_C24A_043A_41E6_743B6D9C4F3A); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 18.41,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_2_0.png",
      "width": 616,
      "class": "ImageResourceLevel",
      "height": 582
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.83,
   "yaw": 146.95
  }
 ],
 "id": "overlay_A710796D_B395_EE0A_41DA_0752F21353DE",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 146.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.83,
   "hfov": 18.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_D0B19F66_C24A_041A_41B9_8EFE336552B6); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD33A290_BDE2_CE06_41C1_B37CC0867E63",
   "pitch": -40.46,
   "yaw": -27.16,
   "hfov": 16.86,
   "distance": 100
  }
 ],
 "id": "overlay_A712B490_B394_E61B_41A2_38730A7C0792",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -27.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.46,
   "hfov": 16.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_D093BF35_C24A_047E_41C2_8D1F5F7C8E2A); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD320290_BDE2_CE06_41D4_71E97C43F482",
   "pitch": -47.35,
   "yaw": -126.7,
   "hfov": 17.24,
   "distance": 100
  }
 ],
 "id": "overlay_A63E7C81_B3BC_66FA_41DD_AC4A0678A292",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -126.7,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.35,
   "hfov": 17.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD328290_BDE2_CE06_41D9_630C403BD6B8",
   "pitch": -30.88,
   "yaw": -69.17,
   "hfov": 14.43,
   "distance": 50
  }
 ],
 "id": "overlay_90726D0E_B6DC_E235_41B5_EA8C6D07F42F",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -69.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_5_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.88,
   "hfov": 14.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_D151EFA5_C24A_041E_41D0_FC08D741DA93); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD35D291_BDE2_CE06_41E0_CD752E25D1E3",
   "pitch": -26.58,
   "yaw": -124.46,
   "hfov": 9.58,
   "distance": 100
  }
 ],
 "id": "overlay_91AF2A5B_B6D5_E6D3_41E0_9AFC4D063CAF",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -124.46,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_6_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.58,
   "hfov": 9.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD35A291_BDE2_CE06_41CB_4D7202663A9E",
   "pitch": -24.18,
   "yaw": -172.16,
   "hfov": 9.77,
   "distance": 100
  }
 ],
 "id": "overlay_915A78EA_B6D5_63FD_41C2_E6B76608423C",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -172.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_7_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.18,
   "hfov": 9.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39, this.camera_D1DBB023_C24A_7C1A_41E4_31054DABE584); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD30828E_BDE2_CE1A_41DF_1D1594E442C4",
   "pitch": -39.6,
   "yaw": -98.88,
   "hfov": 14.67,
   "distance": 100
  }
 ],
 "id": "overlay_A69FC48F_B2F4_2605_41B7_882B095D5499",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -98.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.6,
   "hfov": 14.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD33628E_BDE2_CE1A_41D5_0709E71A376D",
   "pitch": -24.13,
   "yaw": -106.06,
   "hfov": 6.71,
   "distance": 100
  }
 ],
 "id": "overlay_A6C350C4_B2F4_7E7B_41D9_ED8FC1575B96",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -106.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.13,
   "hfov": 6.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_D388D0DB_C24A_7C2B_41E4_E7888B06BBEF); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD03D299_BDE2_CE06_41CD_1EAC745445DA",
   "pitch": -25.05,
   "yaw": 42.27,
   "hfov": 10.16,
   "distance": 100
  }
 ],
 "id": "overlay_A581B76C_B294_220B_41E2_C3CF23E91DAD",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 42.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.05,
   "hfov": 10.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD02529A_BDE2_CE3A_41BD_24A94CA808D2",
   "pitch": -24.6,
   "yaw": 25.56,
   "hfov": 6.6,
   "distance": 50
  }
 ],
 "id": "overlay_A581EE63_B294_223E_41B8_ACDF70FE7F79",
 "data": {
  "label": "Arrow 06b Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 25.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_1_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.6,
   "hfov": 6.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD02329A_BDE2_CE3A_41C6_87621635BCBC",
   "pitch": -13.38,
   "yaw": 41.35,
   "hfov": 4.34,
   "distance": 100
  }
 ],
 "id": "overlay_A5FBFFD5_B294_2205_41D6_BBFDC66D6532",
 "data": {
  "label": "Arrow 06b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 41.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.38,
   "hfov": 4.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_D38140E2_C24A_7C1A_41E4_3AA8A709D9DD); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD02B29A_BDE2_CE3A_41DE_26BC7B7A97CC",
   "pitch": -16.58,
   "yaw": 59.79,
   "hfov": 6.74,
   "distance": 100
  }
 ],
 "id": "overlay_A60710B8_B293_DE0B_41D7_6A53A84E287E",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 59.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.58,
   "hfov": 6.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_D3FD90CE_C24A_7C2A_41E3_01802F564918); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD05029B_BDE2_CE3A_41E1_14155B6B37D7",
   "pitch": -27.84,
   "yaw": -143.33,
   "hfov": 12.44,
   "distance": 100
  }
 ],
 "id": "overlay_A591AD1C_B29C_260B_41E5_1609317911D1",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -143.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.84,
   "hfov": 12.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_D39CD0FA_C24A_7DF5_41DF_80DDD275E3CF); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD05829B_BDE2_CE3A_4179_1DA156A3C418",
   "pitch": -31.16,
   "yaw": 167.07,
   "hfov": 8.49,
   "distance": 100
  }
 ],
 "id": "overlay_A3CE488B_B594_1F6D_41E2_DAF2A43D9141",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 167.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.16,
   "hfov": 8.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_D7FCC556_C24A_043A_41E5_E96AA7F69E90); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD39B289_BDE2_CE06_41D1_57294DBB3961",
   "pitch": -44.63,
   "yaw": -107.82,
   "hfov": 11.07,
   "distance": 100
  }
 ],
 "id": "overlay_A157E29E_B294_2207_41DB_A8AFF0017D7B",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -107.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.63,
   "hfov": 11.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A, this.camera_D7DDB52E_C24A_046A_41DF_9B28575DF011); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD386289_BDE2_CE06_41DA_5BBF33A51C4A",
   "pitch": -39.91,
   "yaw": 154.73,
   "hfov": 18.86,
   "distance": 100
  }
 ],
 "id": "overlay_A7E706F3_B294_621D_41E5_19D2605D803E",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 154.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.91,
   "hfov": 18.86
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34, this.camera_D7ED9549_C24A_0416_41C3_73B8DF0E0A2C); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD38D28A_BDE2_CE1A_41C4_8427A791ABBC",
   "pitch": -38.63,
   "yaw": 73.73,
   "hfov": 19.21,
   "distance": 100
  }
 ],
 "id": "overlay_A7515888_B294_2E0B_41E6_514DE0AF929D",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 73.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.63,
   "hfov": 19.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_D10EEFE2_C24A_041A_41E7_0B8BDBD0483F); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 21.69,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_0_0.png",
      "width": 721,
      "class": "ImageResourceLevel",
      "height": 713
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.52,
   "yaw": -108.93
  }
 ],
 "id": "overlay_A6E4DD05_B294_6605_41E2_C92C885527A9",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -108.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.52,
   "hfov": 21.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28, this.camera_D11EFFEE_C24A_03EA_41C9_A2E9F4632E25); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD26A288_BDE2_CE06_41CD_B7275D98BEEB",
   "pitch": -49.09,
   "yaw": 78.9,
   "hfov": 15.77,
   "distance": 100
  }
 ],
 "id": "overlay_A63AE262_B294_223F_41E4_134E4A27BD52",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 78.9,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.09,
   "hfov": 15.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0D7296_BDE2_CE0A_4184_FC5B749293A2",
   "pitch": -26.49,
   "yaw": -139.69,
   "hfov": 12.26,
   "distance": 50
  }
 ],
 "id": "overlay_A603DF5C_B38C_620B_41E3_C7BBF4996339",
 "data": {
  "label": "Arrow 06b Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -139.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_0_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.49,
   "hfov": 12.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.82,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_1_0.png",
      "width": 328,
      "class": "ImageResourceLevel",
      "height": 328
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.19,
   "yaw": -113.19
  }
 ],
 "id": "overlay_A678B64E_B38C_2207_41AF_1CA339D506C2",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -113.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.19,
   "hfov": 9.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_D4278613_C24A_043B_41A9_0F3A85263394); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0C4296_BDE2_CE0A_41D5_AB63CFD01ABC",
   "pitch": -41.33,
   "yaw": 20.09,
   "hfov": 17.31,
   "distance": 100
  }
 ],
 "id": "overlay_A7C8F46D_B38C_E605_41DD_990F75553A1C",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 20.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.33,
   "hfov": 17.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_D428A604_C24A_041D_41E3_21AEB61372B3); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0CC296_BDE2_CE0A_41C4_0C1EF988A580",
   "pitch": -31.04,
   "yaw": 122.62,
   "hfov": 11.88,
   "distance": 100
  }
 ],
 "id": "overlay_A65300A6_B38C_5E07_41DD_924F60B4ABD4",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 122.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_3_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.04,
   "hfov": 11.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_D418D5EC_C24A_07EE_41E5_BE4182B8DF40); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0F5297_BDE2_CE0A_41A1_9B4B27A9EEAB",
   "pitch": -40.02,
   "yaw": 176.29,
   "hfov": 10.81,
   "distance": 50
  }
 ],
 "id": "overlay_A6B399CE_B374_6E07_41BE_FD833F45CAD7",
 "data": {
  "label": "Arrow 06a Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 176.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_4_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.02,
   "hfov": 10.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_D46A75CB_C24A_042B_41C7_0713A4C79B0F); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0F2297_BDE2_CE0A_41E2_0B41D89AE887",
   "pitch": -25.58,
   "yaw": -59.78,
   "hfov": 17.91,
   "distance": 100
  }
 ],
 "id": "overlay_A48E8D8C_B374_E60B_41E5_6A7AF3B00CE8",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -59.78,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.58,
   "hfov": 17.91
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_D47985DA_C24A_042A_4193_282136EF6C63); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0FB297_BDE2_CE0A_41D0_330763397828",
   "pitch": -12.64,
   "yaw": -60.26,
   "hfov": 7.04,
   "distance": 100
  }
 ],
 "id": "overlay_823DF04B_B73B_E233_41B3_8431C48D263F",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -60.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_6_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.64,
   "hfov": 7.04
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_D40975E8_C24A_0416_41D9_448957433328); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0E3298_BDE2_CE06_41DD_CCC89305E45F",
   "pitch": -45.21,
   "yaw": -150.57,
   "hfov": 13.57,
   "distance": 100
  }
 ],
 "id": "overlay_A35A5AAB_B85A_A8AB_41E3_41E0D295A3AF",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -150.57,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_7_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.21,
   "hfov": 13.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0E9298_BDE2_CE06_41C2_41E072C6C4E4",
   "pitch": 8.53,
   "yaw": -158.13,
   "hfov": 8.36,
   "distance": 100
  }
 ],
 "id": "overlay_A46E567C_B85B_9BAD_41A9_07E6F9FEF714",
 "data": {
  "label": "Circle Arrow 05"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -158.13,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.53,
   "hfov": 8.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_D683F409_C24A_0416_41E5_29A231973AED); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0AC295_BDE2_CE0E_41E6_12940E1B0762",
   "pitch": -49.77,
   "yaw": 133.96,
   "hfov": 17.45,
   "distance": 50
  }
 ],
 "id": "overlay_A6614936_B38C_2E07_41C3_7B6F000998E3",
 "data": {
  "label": "Arrow 06a Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 133.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_1_HS_0_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.77,
   "hfov": 17.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_D52F56F0_C24A_05F6_41DC_4AF3C0B4203B); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3F728C_BDE2_CE1E_418C_A44DB0980762",
   "pitch": -35.69,
   "yaw": -85.39,
   "hfov": 16.71,
   "distance": 100
  }
 ],
 "id": "overlay_A12EA653_B2FC_221E_41C2_244655C0F12F",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -85.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.69,
   "hfov": 16.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3F228C_BDE2_CE1E_41DE_B48C7EDB2C96",
   "pitch": -20.61,
   "yaw": -85.5,
   "hfov": 8.87,
   "distance": 100
  }
 ],
 "id": "overlay_A6B164AD_B2FC_6605_41C7_EEEB1ADB06D2",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -85.5,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.61,
   "hfov": 8.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430, this.camera_D04D576C_C24A_04EE_41E2_0DCFA6A77A84); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3F828D_BDE2_CE1E_41D2_BA98984565F9",
   "pitch": -48.19,
   "yaw": -3.11,
   "hfov": 13.72,
   "distance": 100
  }
 ],
 "id": "overlay_A7BA2C5E_B2FC_2607_41E1_FDAC1ECFC99D",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -3.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.19,
   "hfov": 13.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39, this.camera_D3B7976C_C24A_04EE_41C5_D63AAECD40AF); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3E128D_BDE2_CE1E_41E6_F2AC9F0BF237",
   "pitch": -58.93,
   "yaw": 87.47,
   "hfov": 13.94,
   "distance": 100
  }
 ],
 "id": "overlay_A6F966CC_B2FC_220B_41E4_05F197B134E0",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 87.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_3_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -58.93,
   "hfov": 13.94
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_D741D45C_C24A_042E_41DF_62FAA6B5124B); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1572A6_BDE2_CE0A_41BC_800B0C6EEC1C",
   "pitch": -42.15,
   "yaw": -120.41,
   "hfov": 16.58,
   "distance": 50
  }
 ],
 "id": "overlay_ACE3D251_B574_13FD_41C9_3ED1B5AFE731",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -120.41,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.15,
   "hfov": 16.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430, this.camera_D70F84B0_C24A_0476_41CC_A4B03E06D300); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD31128D_BDE2_CE1E_41B2_38CDAA87A140",
   "pitch": -44.71,
   "yaw": -118.33,
   "hfov": 17.09,
   "distance": 100
  }
 ],
 "id": "overlay_A6E80BC6_B2FC_6206_41D6_C9A2D50EB19B",
 "data": {
  "label": "Arrow 07b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -118.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.71,
   "hfov": 17.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_1_0.png",
      "width": 333,
      "class": "ImageResourceLevel",
      "height": 309
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.6,
   "yaw": -120.25
  }
 ],
 "id": "overlay_A900D003_B6F4_E233_41E0_F870378D67EA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -120.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.6,
   "hfov": 10
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E, this.camera_D068B7C1_C24A_0417_41AE_284A50BD1488); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD208285_BDE2_CE0E_41CF_42EF013EA29E",
   "pitch": -11.48,
   "yaw": -60.71,
   "hfov": 11.68,
   "distance": 100
  }
 ],
 "id": "overlay_A6A05E9E_B294_2206_4198_456CF856B339",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -60.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.48,
   "hfov": 11.68
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_D042877D_C24A_04EE_41E4_4CAD53FCCAB6); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD235285_BDE2_CE0E_41E2_C02ADE1003FA",
   "pitch": -20.4,
   "yaw": 91.25,
   "hfov": 15.08,
   "distance": 100
  }
 ],
 "id": "overlay_A4C571CE_B294_7E07_41D1_47E11FFE9D44",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 91.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.4,
   "hfov": 15.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD231285_BDE2_CE0E_41E2_BD1ABD23DDD7",
   "pitch": -15.86,
   "yaw": 50,
   "hfov": 15.48,
   "distance": 100
  }
 ],
 "id": "overlay_A10D4886_B294_6E07_41A8_FDEB9B15FA4E",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 50,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.86,
   "hfov": 15.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943, this.camera_D05EF79E_C24A_042A_41DA_91A779394FA4); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.7,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_3_0.png",
      "width": 322,
      "class": "ImageResourceLevel",
      "height": 327
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.33,
   "yaw": -0.85
  }
 ],
 "id": "overlay_A4A048F5_B6CB_63D7_41E2_CADAF7431EB9",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -0.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_3_0_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.33,
   "hfov": 9.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_D55166A4_C24A_041E_41E5_0125F0FB4068); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 23.67,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_0_0.png",
      "width": 810,
      "class": "ImageResourceLevel",
      "height": 967
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.17,
   "yaw": 59.91
  }
 ],
 "id": "overlay_A15A77A4_B28C_223B_41D4_961EBEF9520D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 59.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.17,
   "hfov": 23.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7, this.camera_D57026C2_C24A_041A_41C5_D20A2E8C2D87); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3D528B_BDE2_CE1A_419A_FB4219266FAF",
   "pitch": -32.26,
   "yaw": -26.04,
   "hfov": 16.07,
   "distance": 100
  }
 ],
 "id": "overlay_A1426398_B28C_220B_41CF_5CB6C0F48471",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -26.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.26,
   "hfov": 16.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3D228B_BDE2_CE1A_41CA_A52BAEF71DB4",
   "pitch": -23.48,
   "yaw": -66.86,
   "hfov": 17.43,
   "distance": 100
  }
 ],
 "id": "overlay_A1539037_B2F3_FE05_41D2_2E8B1531C992",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -66.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.48,
   "hfov": 17.43
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_D1BAB341_C24A_7C16_41E6_F5F810CA8D48); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD253286_BDE2_CE0A_41D9_4FD6E794C0A7",
   "pitch": -16.12,
   "yaw": 20.87,
   "hfov": 18.46,
   "distance": 100
  }
 ],
 "id": "overlay_A1D575FB_B294_660D_41E6_37913D75622D",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 20.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.12,
   "hfov": 18.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C, this.camera_D6692363_C24A_7C1A_41D2_459B668057D0); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.05,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_0_0.png",
      "width": 269,
      "class": "ImageResourceLevel",
      "height": 297
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.31,
   "yaw": 42.93
  }
 ],
 "id": "overlay_AC08694A_B68C_31EF_41AF_C3038D9E6E8C",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 42.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.31,
   "hfov": 8.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63, this.camera_D6595361_C24A_7C16_41D1_2DCA825C5D29); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD16E2A9_BDE2_CE06_41E5_F63C8959731C",
   "pitch": -10.94,
   "yaw": -114.84,
   "hfov": 10.08,
   "distance": 100
  }
 ],
 "id": "overlay_A34189AB_B68C_10AD_41CD_E111D2202B16",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -114.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.94,
   "hfov": 10.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4, this.camera_D00BB170_C24A_7CF6_41DD_282A887CAED0); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD04029B_BDE2_CE3A_41DF_77B425D6B3F0",
   "pitch": -32.86,
   "yaw": -27.97,
   "hfov": 20.02,
   "distance": 100
  }
 ],
 "id": "overlay_A3F57B2F_B58C_31A5_41B1_C3B0D323E499",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -27.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.86,
   "hfov": 20.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_D07F8170_C24A_7CF6_4186_48D98DA8DDA8); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD07529B_BDE2_CE3A_41C8_AD0D6DD26DFA",
   "pitch": -27.68,
   "yaw": 61.25,
   "hfov": 14.17,
   "distance": 100
  }
 ],
 "id": "overlay_A3ACC614_B58C_137B_41E1_232DBC95532F",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 61.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.68,
   "hfov": 14.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_D0196180_C24A_7C15_41CE_89050311B300); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD07229C_BDE2_CE3E_41D3_E10116C753E2",
   "pitch": -15.21,
   "yaw": 61.19,
   "hfov": 6.55,
   "distance": 100
  }
 ],
 "id": "overlay_AC5CAF7E_B58C_11A7_41D5_27EB46ACF8EF",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 61.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.21,
   "hfov": 6.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD07A29C_BDE2_CE3E_41D3_F13723D5AB5D",
   "pitch": -13.69,
   "yaw": 55,
   "hfov": 4.7,
   "distance": 50
  }
 ],
 "id": "overlay_A3FB9C62_B58C_17DF_41B2_2D2AE041D46F",
 "data": {
  "label": "Arrow 06b Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_3_0_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.69,
   "hfov": 4.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD06229C_BDE2_CE3E_41D5_4D0FB60847B4",
   "pitch": -9.78,
   "yaw": 62.55,
   "hfov": 2.98,
   "distance": 100
  }
 ],
 "id": "overlay_A3DD8EFE_B58C_70A7_41B4_362FA234601A",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 62.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_4_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.78,
   "hfov": 2.98
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_D02371A5_C24A_7C1E_41B4_BA12FE2118C9); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD06B29D_BDE2_CE3E_41DD_52E11F43EA30",
   "pitch": -32.12,
   "yaw": 123.19,
   "hfov": 8.09,
   "distance": 100
  }
 ],
 "id": "overlay_A3D22D14_B594_117B_41E6_760EE19E43F8",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 123.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.12,
   "hfov": 8.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_D0153198_C24A_7C35_4141_582839F8A708); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.06,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_6_0.png",
      "width": 434,
      "class": "ImageResourceLevel",
      "height": 476
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.69,
   "yaw": -81.16
  }
 ],
 "id": "overlay_8B6BE10B_B75C_E233_41D1_BA093F4471F8",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -81.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.69,
   "hfov": 13.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_D13F62D2_C24A_7C3A_41C7_92479131F3B0); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD11C2A3_BDE2_CE0A_41D1_51CC382AC951",
   "pitch": -22.85,
   "yaw": -90.44,
   "hfov": 10.77,
   "distance": 100
  }
 ],
 "id": "overlay_A3E15370_B58C_11BC_41E6_4C27776DF80D",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -90.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.85,
   "hfov": 10.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571, this.camera_D12F52C4_C24A_7C1D_41CC_42D5F57728D5); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1052A3_BDE2_CE0A_41D9_789992D071B2",
   "pitch": -22.04,
   "yaw": 18.97,
   "hfov": 12.02,
   "distance": 100
  }
 ],
 "id": "overlay_ACFC9CC8_B58C_10EB_41E2_29DDE0C71B35",
 "data": {
  "label": "Arrow 06b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 18.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.04,
   "hfov": 12.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_D77054A1_C24A_0416_41E2_68B93FBA53D1); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1FA2A2_BDE2_CE0A_41DA_073B71E84565",
   "pitch": -20.06,
   "yaw": -150.88,
   "hfov": 10.67,
   "distance": 100
  }
 ],
 "id": "overlay_A3B03E31_B594_13BD_41D3_974DC13A7193",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -150.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.06,
   "hfov": 10.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1E22A2_BDE2_CE0A_418C_79A7A6A15941",
   "pitch": -14.08,
   "yaw": -168.47,
   "hfov": 4.99,
   "distance": 100
  }
 ],
 "id": "overlay_A386E8BA_B594_70AC_41E4_A461BFCF4CD8",
 "data": {
  "label": "Arrow 06c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -168.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.08,
   "hfov": 4.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_D760F489_C24A_0416_41D0_4BB6812134B6); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1152A3_BDE2_CE0A_41B5_AD4CFABBC030",
   "pitch": -11.56,
   "yaw": 18.72,
   "hfov": 10.15,
   "distance": 100
  }
 ],
 "id": "overlay_A39912AD_B594_10A5_41DC_4C47E8D4EB26",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 18.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.56,
   "hfov": 10.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_D100729C_C24A_7C2E_41D1_75F272116CB4); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1D82A1_BDE2_CE06_41C7_4A50B9BECD4A",
   "pitch": -29.93,
   "yaw": 153.61,
   "hfov": 11.36,
   "distance": 50
  }
 ],
 "id": "overlay_A3459C80_B594_175B_41B0_B5016DEACF26",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 153.61,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.93,
   "hfov": 11.36
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C, this.camera_D11032B6_C24A_7C7D_41CE_045F8C5AEDC3); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1C02A1_BDE2_CE06_41E1_41CA0867DE01",
   "pitch": -20.71,
   "yaw": -5.69,
   "hfov": 19.81,
   "distance": 100
  }
 ],
 "id": "overlay_A3EC57E4_B594_10DB_41E4_457C674F15AD",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -5.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.71,
   "hfov": 19.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_D162928B_C24A_7C2B_41CA_DE2EDA62EDE6); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1C82A2_BDE2_CE0A_41C8_8E4D64B230C0",
   "pitch": -6.59,
   "yaw": -5.39,
   "hfov": 6.76,
   "distance": 100
  }
 ],
 "id": "overlay_A84D05ED_B594_10A4_41A9_DBA42200C405",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -5.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.59,
   "hfov": 6.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917, this.camera_D1700299_C24A_7C36_41DD_9884003196BC); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1FD2A2_BDE2_CE0A_41E1_8C5ACD99881C",
   "pitch": -8.73,
   "yaw": -104.77,
   "hfov": 24.19,
   "distance": 100
  }
 ],
 "id": "overlay_A3985956_B594_11E7_41D6_B17047DD216F",
 "data": {
  "label": "Circle Generic 04"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -104.77,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.73,
   "hfov": 24.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_D45AC5C0_C24A_0415_41CF_C820522619D0); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ACE912A9_BDE2_CE06_41C3_246836C215B4",
   "pitch": -12.31,
   "yaw": -147.51,
   "hfov": 10.61,
   "distance": 100
  }
 ],
 "id": "overlay_A35DDE43_B694_13DD_41DA_B50490B813A5",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -147.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.31,
   "hfov": 10.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_D44925B3_C24A_047B_41E4_DD9C1A24E264); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ACE992AA_BDE2_CE1A_41D0_731A362F58D7",
   "pitch": -4.16,
   "yaw": -52.95,
   "hfov": 7.16,
   "distance": 100
  }
 ],
 "id": "overlay_A34A230D_B69C_1164_41D2_523E9713FC6C",
 "data": {
  "label": "Arrow 05"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -52.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_1_0_0_map.gif",
      "width": 30,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.16,
   "hfov": 7.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_D7518476_C24A_04FD_41E7_3B6BA84FDEB9); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.16,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_1_HS_0_0.png",
      "width": 536,
      "class": "ImageResourceLevel",
      "height": 738
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.25,
   "yaw": -131.83
  }
 ],
 "id": "overlay_A35C1888_B69C_3F6B_41DC_F150EEDBD9B3",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -131.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.25,
   "hfov": 14.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34, this.camera_D71F74C1_C24A_0417_41B9_AF61960CD86B); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3A528A_BDE2_CE1A_41D4_16EB6D72CBB5",
   "pitch": -33.27,
   "yaw": 40.71,
   "hfov": 15.53,
   "distance": 100
  }
 ],
 "id": "overlay_A16BEE30_B28C_621A_41B4_A0885BB8C271",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 40.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.27,
   "hfov": 15.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3A228B_BDE2_CE1A_41D0_60C70DBAFFA9",
   "pitch": -20.88,
   "yaw": 12,
   "hfov": 9.54,
   "distance": 50
  }
 ],
 "id": "overlay_ACA27E65_B6FC_DEF7_41E6_D85BF0C0F9B7",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.88,
   "hfov": 9.54
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7, this.camera_D1ACE337_C24A_7C7A_41C5_AFD7F8B0C928); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3C228C_BDE2_CE1E_41DB_30E364C44D88",
   "pitch": -38.63,
   "yaw": -164.02,
   "hfov": 14.81,
   "distance": 100
  }
 ],
 "id": "overlay_A6C644CF_B2F5_E605_41C2_03F4FA4A3D05",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -164.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.63,
   "hfov": 14.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.99,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_1_0.png",
      "width": 264,
      "class": "ImageResourceLevel",
      "height": 370
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.3,
   "yaw": -136.91
  }
 ],
 "id": "overlay_A11C2CBC_B2F4_660B_41C3_9754038D0D88",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -136.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.3,
   "hfov": 7.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_D6912416_C24A_043A_41E1_33E329F26EEB); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD034299_BDE2_CE06_41DC_3995C0FB5708",
   "pitch": -32.32,
   "yaw": -64.58,
   "hfov": 12.9,
   "distance": 100
  }
 ],
 "id": "overlay_A623A739_B37C_620D_41BA_EC1F16031DAE",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -64.58,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.32,
   "hfov": 12.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_D62683B7_C24A_7C7A_41D6_918D69D82766); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0A5295_BDE2_CE0E_415E_2D5BDDDBEF34",
   "pitch": -34.12,
   "yaw": -50.11,
   "hfov": 21.53,
   "distance": 100
  }
 ],
 "id": "overlay_A66E5240_B3B4_227A_41D4_EFF40490AE9A",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -50.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.12,
   "hfov": 21.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_D637D3C4_C24A_7C1E_41C9_C71058F1E6C7); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD31A28F_BDE2_CE1A_41E7_49538DABB241",
   "pitch": 13.17,
   "yaw": -23.44,
   "hfov": 11.73,
   "distance": 100
  }
 ],
 "id": "overlay_A6E6238D_B28C_220A_41E3_B57DEA725058",
 "data": {
  "label": "Circle Generic 04"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -23.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.17,
   "hfov": 11.73
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_D6D493D7_C24A_7C3A_41E4_6C2CCB909B47); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD30028F_BDE2_CE1A_41D3_F0EBA04E6F89",
   "pitch": -43.75,
   "yaw": 0.05,
   "hfov": 5.41,
   "distance": 100
  }
 ],
 "id": "overlay_A6CDE92C_B28C_2E0A_4194_F30F37CAF4C8",
 "data": {
  "label": "Circle 02b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 0.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_1_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.75,
   "hfov": 5.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_D72F04E5_C24A_041E_41B0_5E42DFF40113); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD19629E_BDE2_CE3A_41E2_226357DF9B0A",
   "pitch": -27.97,
   "yaw": 84.31,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_A3E111D5_B594_10E5_41C5_6E273440BC6E",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 84.31,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.97,
   "hfov": 13.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_D73E44F3_C24A_05FA_41CF_69D00E086945); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD19C29E_BDE2_CE3A_41DC_A2B1E6D03A64",
   "pitch": -26.32,
   "yaw": 12.05,
   "hfov": 13.97,
   "distance": 100
  }
 ],
 "id": "overlay_A3427BAC_B594_F0AB_41E3_584E8B987CCD",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 12.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.32,
   "hfov": 13.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E, this.camera_D7CE7518_C24A_0435_41D2_2DF47BFEFA5A); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD18429F_BDE2_CE3A_41D8_968D9EC86F2B",
   "pitch": -18.23,
   "yaw": -140.11,
   "hfov": 15.3,
   "distance": 100
  }
 ],
 "id": "overlay_A3FBFB39_B594_11AD_41D3_81E8CDCC1CFB",
 "data": {
  "label": "Circle Generic 04"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -140.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.23,
   "hfov": 15.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.49,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_3_0.png",
      "width": 281,
      "class": "ImageResourceLevel",
      "height": 273
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.78,
   "yaw": 9.34
  }
 ],
 "id": "overlay_F45FECC5_B754_A237_41E4_F91A927F2A47",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 9.34,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.78,
   "hfov": 8.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD18A29F_BDE2_CE3A_41E3_7F0C90A0F47B",
   "pitch": -23.27,
   "yaw": 100.84,
   "hfov": 9.21,
   "distance": 50
  }
 ],
 "id": "overlay_FE64F1A8_B757_627D_41E3_AD93A9EDCAFA",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 100.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_4_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.27,
   "hfov": 9.21
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_D0B6A255_C24A_7C3E_41CB_65D682C0EB09); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD016298_BDE2_CE06_41DB_6C900462E8D2",
   "pitch": -42.71,
   "yaw": -158.98,
   "hfov": 20.75,
   "distance": 100
  }
 ],
 "id": "overlay_A6DC1EB1_B374_221D_41DE_D83EFBFFB4E6",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -158.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.71,
   "hfov": 20.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4, this.camera_D0AB221E_C24A_7C2A_41C2_1FEEAD870C49); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD01F298_BDE2_CE06_41E4_851B14B13AE7",
   "pitch": -36.21,
   "yaw": 108.85,
   "hfov": 15.74,
   "distance": 100
  }
 ],
 "id": "overlay_A7563243_B374_227D_41C1_948A1F8F4998",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 108.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.21,
   "hfov": 15.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_D0B9123E_C24A_7C6A_41D4_F03FEB7BEAAD); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD006299_BDE2_CE06_4171_75047919576B",
   "pitch": -27.46,
   "yaw": -157.73,
   "hfov": 11.49,
   "distance": 100
  }
 ],
 "id": "overlay_8FA0D115_B74B_6254_41E5_98CB9C7406C4",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -157.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.46,
   "hfov": 11.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD00C299_BDE2_CE06_41C3_30B43AB1590F",
   "pitch": 7.57,
   "yaw": -160.49,
   "hfov": 6,
   "distance": 100
  }
 ],
 "id": "overlay_A3C42F48_B856_69D5_41DF_8253C2CD632F",
 "data": {
  "label": "Circle Arrow 05"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -160.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.57,
   "hfov": 6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_D78B2575_C24A_04FF_41E0_2AC087B1E475); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0A2295_BDE2_CE0E_41A5_134703E8586B",
   "pitch": -26.91,
   "yaw": -49.2,
   "hfov": 13.92,
   "distance": 100
  }
 ],
 "id": "overlay_A639D286_B38C_2207_41E0_B4CD2BCB7DDA",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -49.2,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.91,
   "hfov": 13.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0A8295_BDE2_CE0E_41B5_4F90740A49B5",
   "pitch": -19.58,
   "yaw": -56.39,
   "hfov": 6.16,
   "distance": 50
  }
 ],
 "id": "overlay_84CA4BFE_B73C_A5D5_41B3_056930E024CD",
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -56.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.58,
   "hfov": 6.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A, this.camera_D616B3A5_C24A_7C1E_41A5_85E5D279E862); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 29.74,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_0_0.png",
      "width": 985,
      "class": "ImageResourceLevel",
      "height": 1072
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.03,
   "yaw": 93.27
  }
 ],
 "id": "overlay_A111A483_B293_E6FD_41E0_493A02B80FB7",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 93.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.03,
   "hfov": 29.74
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_D608138E_C24A_7C2A_41E0_A74E59848FF1); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD39D288_BDE2_CE06_41D6_41D2A103463B",
   "pitch": -44.48,
   "yaw": -164.86,
   "hfov": 19.13,
   "distance": 100
  }
 ],
 "id": "overlay_A6D36010_B294_FE1A_41C2_787255E488AB",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -164.86,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.48,
   "hfov": 19.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_D6780374_C24A_7CFD_41E5_0493851A7E85); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD263288_BDE2_CE06_4186_C56DC784AAB2",
   "pitch": -41.98,
   "yaw": 10.45,
   "hfov": 14.89,
   "distance": 100
  }
 ],
 "id": "overlay_A17D4916_B295_EE07_41E1_73CF3F266C33",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 10.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.98,
   "hfov": 14.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_D081E1FE_C24A_7FEA_41DA_256681140EC6); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0B8295_BDE2_CE0E_41E5_DA516ADA771E",
   "pitch": -36.01,
   "yaw": 70.43,
   "hfov": 19.89,
   "distance": 100
  }
 ],
 "id": "overlay_A6769466_B38C_6607_41B2_7DAC595DA138",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 70.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.01,
   "hfov": 19.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_D09D520E_C24A_7C2A_41CF_8CFD3974B137); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0A1295_BDE2_CE0E_41D3_F631569555A3",
   "pitch": -24.13,
   "yaw": 75.27,
   "hfov": 6.1,
   "distance": 100
  }
 ],
 "id": "overlay_848EA393_B73F_6653_41C1_9494860D7408",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 75.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_1_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.13,
   "hfov": 6.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_D12C0FF4_C24A_03FD_41E5_C097C19E8D16); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD08E294_BDE2_CE0E_41E3_2B07D3592015",
   "pitch": -41.2,
   "yaw": -147.58,
   "hfov": 15.9,
   "distance": 100
  }
 ],
 "id": "overlay_A66A75AE_B3BC_2607_41E0_99495DC1CE0C",
 "data": {
  "label": "Arrow 04b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -147.58,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.2,
   "hfov": 15.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40, this.camera_D13C7010_C24A_7C35_41D6_9E66AF33545E); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0B5294_BDE2_CE0E_41D5_D3C1F1928094",
   "pitch": -47.43,
   "yaw": 117.82,
   "hfov": 23.97,
   "distance": 100
  }
 ],
 "id": "overlay_A66EEB8F_B3B4_2206_41D9_B472B986BFC2",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 117.82,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.43,
   "hfov": 23.97
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758, this.camera_D1CC201E_C24A_7C2A_417D_9B5DA363DA3C); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD0BC294_BDE2_CE0E_41CD_5776A9DDE25E",
   "pitch": -40.77,
   "yaw": 31.2,
   "hfov": 16.96,
   "distance": 100
  }
 ],
 "id": "overlay_A65E32F1_B3B4_E21A_41E5_162020AE7575",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 31.2,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.77,
   "hfov": 16.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_D1EBA03F_C24A_7C6A_41CA_6E62107F9A53); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD343291_BDE2_CE06_41CE_1369FB100E75",
   "pitch": -50.54,
   "yaw": 132.33,
   "hfov": 15.3,
   "distance": 100
  }
 ],
 "id": "overlay_A6539B97_B3BC_2206_41A5_D82F19533741",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 132.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -50.54,
   "hfov": 15.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9, this.camera_D1FA804F_C24A_7C2A_41E3_E9C3ACB983B6); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD34A292_BDE2_CE0A_41AA_DFBEFD5AF622",
   "pitch": -49.1,
   "yaw": 25.09,
   "hfov": 15.77,
   "distance": 100
  }
 ],
 "id": "overlay_A638CFC8_B3BC_E20B_41E4_7C1C4EF0DD77",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 25.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.1,
   "hfov": 15.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_D3EB909E_C24A_7C2A_41B7_730DF28BE421); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD373292_BDE2_CE0A_41CB_55C0BEAC9096",
   "pitch": -48.51,
   "yaw": -55.94,
   "hfov": 15.78,
   "distance": 100
  }
 ],
 "id": "overlay_A789B760_B3BC_223B_41E4_5B607861AFEF",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -55.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_2_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.51,
   "hfov": 15.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4, this.camera_D18A905E_C24A_7C2D_41D3_88A756611854); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD378292_BDE2_CE0A_41E2_3A1C85C23AC5",
   "pitch": -8.84,
   "yaw": 129.88,
   "hfov": 9.14,
   "distance": 100
  }
 ],
 "id": "overlay_9ED4A39C_B6D4_E655_41DB_8A29F7AA08A5",
 "data": {
  "label": "Circle Generic 04"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 129.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.84,
   "hfov": 9.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_D3E1E0AE_C24A_7C6A_41D5_D23C6374A5E3); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD366292_BDE2_CE0A_41B4_3FACCCA447F5",
   "pitch": -31.78,
   "yaw": 170.47,
   "hfov": 11.65,
   "distance": 100
  }
 ],
 "id": "overlay_9CDEF6CD_B6CB_AE34_41DA_8C081869FC02",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 170.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.78,
   "hfov": 11.65
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_D3E7A0BE_C24A_7C6A_41E5_18DF4231DF91); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD36E293_BDE2_CE0A_41E4_2A59C2C69E8D",
   "pitch": -18.87,
   "yaw": 155.54,
   "hfov": 7.28,
   "distance": 100
  }
 ],
 "id": "overlay_9E8069F2_B6CC_A5ED_41E4_CB4B70F88FB0",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 155.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.87,
   "hfov": 7.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9, this.camera_D0D66EB7_C24A_047A_41B2_D93319BD86DA); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD09A293_BDE2_CE0A_41D1_5C36A9544420",
   "pitch": -43.92,
   "yaw": -69.85,
   "hfov": 19.75,
   "distance": 100
  }
 ],
 "id": "overlay_A79FC131_B3BD_DE1D_41CB_6D0DB5D6FBA8",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -69.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.92,
   "hfov": 19.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.3,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_1_0.png",
      "width": 311,
      "class": "ImageResourceLevel",
      "height": 378
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.96,
   "yaw": -78.74
  }
 ],
 "id": "overlay_A6640D08_B3BC_260B_41DC_5121CDCA6EA7",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -78.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.96,
   "hfov": 9.3
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917, this.camera_D6A2C42C_C24A_046D_41E1_2A7265B4D57F); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD10E2A4_BDE2_CE0E_41E1_92E2BC7EEA15",
   "pitch": -20.21,
   "yaw": -174.39,
   "hfov": 6.6,
   "distance": 100
  }
 ],
 "id": "overlay_A3BE4913_B58C_117D_41D2_272BE5657E02",
 "data": {
  "label": "Arrow 06b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -174.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.21,
   "hfov": 6.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273, this.camera_D6B2443D_C24A_046F_41DD_94257B995EC2); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1312A4_BDE2_CE0E_41E1_6705D6CE0BFB",
   "pitch": -18.68,
   "yaw": 4.53,
   "hfov": 5.64,
   "distance": 100
  }
 ],
 "id": "overlay_AC6CF670_B58C_13BB_41E5_7D3E6F2E0DCC",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 4.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.68,
   "hfov": 5.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_D1CE82E1_C24A_7C17_41E5_0ABB5C94B8D7); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1762A8_BDE2_CE06_41E6_07CEA8951F4F",
   "pitch": -6.57,
   "yaw": -56.55,
   "hfov": 8.11,
   "distance": 100
  }
 ],
 "id": "overlay_A3469FE2_B68C_10DC_41DF_6B5634CED5FB",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -56.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.57,
   "hfov": 8.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_D1DE42EF_C24A_7DEB_41E5_E45A13808705); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.06,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_1_0.png",
      "width": 203,
      "class": "ImageResourceLevel",
      "height": 229
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.42,
   "yaw": -170.83
  }
 ],
 "id": "overlay_A327DE79_B68C_33AD_4193_D0A50D92FF3D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -170.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.42,
   "hfov": 6.06
  }
 ]
},
{
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "class": "Button",
 "shadowSpread": 1,
 "width": 60,
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "mode": "push",
 "height": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "pressedRollOverIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed_rollover.png",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "Button settings VR"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal"
},
{
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "class": "Button",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "rollOverIconHeight": 30,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "mode": "toggle",
 "pressedIconHeight": 30,
 "height": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": 12,
 "pressedRollOverIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed_rollover.png",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconWidth": 30,
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "data": {
  "name": "Button Settings Gyro"
 },
 "layout": "horizontal"
},
{
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "iconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA.png",
 "class": "Button",
 "shadowSpread": 1,
 "width": 60,
 "pressedIconWidth": 30,
 "id": "Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "iconWidth": 30,
 "rollOverBackgroundOpacity": 1,
 "iconHeight": 30,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 1,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "rollOverIconHeight": 30,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "mode": "toggle",
 "pressedIconHeight": 30,
 "height": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed.png",
 "pressedRollOverIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed_rollover.png",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "Button Settings HS"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconWidth": 30,
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal"
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_D0E501DF_C24A_7C2B_41E5_95A9BBD2E841); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.99,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_0_0.png",
      "width": 479,
      "class": "ImageResourceLevel",
      "height": 471
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 15.34,
   "yaw": -143.79
  }
 ],
 "id": "overlay_A116EB46_B29C_6207_41E0_442B55E89DA4",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -143.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 15.34,
   "hfov": 13.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_D0DB21CF_C24A_7C2A_41C0_9575F8BCD420); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD244286_BDE2_CE0A_41D4_8D9E8B17C242",
   "pitch": -49.92,
   "yaw": -113.09,
   "hfov": 8.11,
   "distance": 100
  }
 ],
 "id": "overlay_A6EC268E_B29C_2207_41DB_EF3BE4C5AF26",
 "data": {
  "label": "Circle 03a"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -113.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.92,
   "hfov": 8.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62, this.camera_D0F41EF1_C24A_05F6_41DD_F87663F3748F); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3D828B_BDE2_CE1A_41D5_57FF3050E050",
   "pitch": -36.03,
   "yaw": -34.84,
   "hfov": 21.13,
   "distance": 100
  }
 ],
 "id": "overlay_A6F613F2_B2F4_221F_41C4_11EC6A5D6BC3",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -34.84,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.03,
   "hfov": 21.13
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28, this.camera_D0E6CED1_C24A_0437_41D2_9A6CC4EAD8EE); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3C728C_BDE2_CE1E_41B5_919F2A837FFB",
   "pitch": -34.32,
   "yaw": -133.62,
   "hfov": 21.57,
   "distance": 100
  }
 ],
 "id": "overlay_A66E538A_B2F4_E20F_41BD_C6E949D03F29",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -133.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.32,
   "hfov": 21.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_D4D7C63B_C24A_046A_41E4_FF87E63ACC92); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD21F283_BDE2_CE0A_41E6_71622AF69DA7",
   "pitch": -13.8,
   "yaw": -135.13,
   "hfov": 11.48,
   "distance": 100
  }
 ],
 "id": "overlay_A225C117_B29C_DE05_41E0_0C4CE54E91DE",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -135.13,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.8,
   "hfov": 11.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_D4C8F61F_C24A_042A_41BE_7A517ECC7F3F); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD204284_BDE2_CE0E_41D2_40269B2C3056",
   "pitch": -7.95,
   "yaw": -133.51,
   "hfov": 5.25,
   "distance": 100
  }
 ],
 "id": "overlay_A63B2BE4_B6D5_A5F4_4193_343AED842967",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -133.51,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.95,
   "hfov": 5.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571, this.camera_D50F16C6_C24A_041D_41CC_17092AD00427); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1392A4_BDE2_CE0E_41CA_CDDFDB858541",
   "pitch": -24.07,
   "yaw": 52.97,
   "hfov": 8.71,
   "distance": 100
  }
 ],
 "id": "overlay_ACAA9B16_B58C_3164_41D1_D1A4B60E77C1",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 52.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.07,
   "hfov": 8.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_D51F16E0_C24A_0415_41D5_D0F87A2D9891); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1272A5_BDE2_CE0E_41E1_845200C9D85A",
   "pitch": -34.75,
   "yaw": 179.83,
   "hfov": 21.71,
   "distance": 100
  }
 ],
 "id": "overlay_A3AFA20C_B58C_136B_41DF_2BF4D20F8B28",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 179.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.75,
   "hfov": 21.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1292A5_BDE2_CE0E_41B7_E241275F14B6",
   "pitch": -19.03,
   "yaw": 136.79,
   "hfov": 5.81,
   "distance": 100
  }
 ],
 "id": "overlay_F9256439_B777_625C_41E6_18134498E027",
 "data": {
  "label": "Arrow 06b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 136.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.03,
   "hfov": 5.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_D0C61E98_C24A_0436_41E1_486631C58B5B); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD31A28E_BDE2_CE1A_41E3_9FAC6A16E21A",
   "pitch": -39.43,
   "yaw": -127.24,
   "hfov": 12.83,
   "distance": 100
  }
 ],
 "id": "overlay_A6F9F7B9_B2FC_220D_41E4_E34396F194F3",
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -127.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.43,
   "hfov": 12.83
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E, this.camera_D0C8EE73_C24A_04FB_41DC_CCF1CA122F6F); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD30128E_BDE2_CE1A_41E1_6A64D3AB5A05",
   "pitch": -37.4,
   "yaw": 52.42,
   "hfov": 17.93,
   "distance": 100
  }
 ],
 "id": "overlay_A6EB9B77_B2FC_2205_41E0_A090AA0C43CD",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 52.42,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.4,
   "hfov": 17.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_D1EDD2FC_C24A_7DEE_41C9_CAE14E727F93); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD06129D_BDE2_CE3E_41D4_39F74D680D6B",
   "pitch": -35.22,
   "yaw": -149.79,
   "hfov": 12.56,
   "distance": 100
  }
 ],
 "id": "overlay_A3CA1829_B58C_1FAC_41D2_7D150963EF5A",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -149.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.22,
   "hfov": 12.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.37,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_1_0.png",
      "width": 311,
      "class": "ImageResourceLevel",
      "height": 305
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.84,
   "yaw": -134.38
  }
 ],
 "id": "overlay_F74E4707_B75C_AE33_41CC_032D81451266",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -134.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.84,
   "hfov": 9.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_D0555156_C24A_7C3A_41D5_FC1A81EC0E9D); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1B329F_BDE2_CE3A_41DC_A35F0A822B23",
   "pitch": -37.83,
   "yaw": 76.56,
   "hfov": 11.07,
   "distance": 100
  }
 ],
 "id": "overlay_A3C66036_B594_EFA7_41A2_11A03EB23B88",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 76.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.83,
   "hfov": 11.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1BA2A0_BDE2_CE06_41E3_3FB79B8F5367",
   "pitch": -19.08,
   "yaw": 56.55,
   "hfov": 9.14,
   "distance": 100
  }
 ],
 "id": "overlay_A3A4236E_B594_31A7_41E3_F3D7A5338CCC",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 56.55,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.08,
   "hfov": 9.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1A32A0_BDE2_CE06_41D9_F1F8A9C1B001",
   "pitch": -19.99,
   "yaw": 103.76,
   "hfov": 7.37,
   "distance": 100
  }
 ],
 "id": "overlay_AC691B70_B594_11BB_41E0_91D054FDD64E",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 103.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.99,
   "hfov": 7.37
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.56,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_3_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.88,
   "yaw": 53.98
  }
 ],
 "id": "overlay_F3F410E6_B755_63F5_41B3_43A112BBD5A7",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 53.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.88,
   "hfov": 4.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1D32A1_BDE2_CE06_41E1_4DD344BC13D8",
   "pitch": -17.72,
   "yaw": 112.63,
   "hfov": 5.89,
   "distance": 50
  }
 ],
 "id": "overlay_FFF6FB46_B74D_A634_41D1_3C89F5F80468",
 "data": {
  "label": "Arrow 06b Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 112.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_4_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.72,
   "hfov": 5.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_D0CEF1BF_C24A_7C6A_41C5_DBBF0990FA89); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 27.17,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_0_0.png",
      "width": 912,
      "class": "ImageResourceLevel",
      "height": 876
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10,
   "yaw": -132.19
  }
 ],
 "id": "overlay_A11965BD_B2FC_660A_41B5_37919A2C967C",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -132.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10,
   "hfov": 27.17
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED, this.camera_D03081AF_C24A_7C6A_41D1_86AFF56E416C); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3E828D_BDE2_CE1E_41C8_C4FF95DC4162",
   "pitch": -47.16,
   "yaw": 48.26,
   "hfov": 16.87,
   "distance": 100
  }
 ],
 "id": "overlay_A6F696B6_B2FC_E206_41E4_B4B1380586BA",
 "data": {
  "label": "Arrow 07b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 48.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.16,
   "hfov": 16.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_D064A7DA_C24A_042A_41D6_9901504BB924); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3B528A_BDE2_CE1A_41E0_6A5A448B7C91",
   "pitch": -30.67,
   "yaw": -83.52,
   "hfov": 15.75,
   "distance": 100
  }
 ],
 "id": "overlay_A6A7899D_B28C_2E05_41E4_2CD66509294C",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -83.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.67,
   "hfov": 15.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C, this.camera_D1FDE30A_C24A_7C2A_41CF_9B88A683FDD0); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1572A5_BDE2_CE0E_41E5_03FB6ED51534",
   "pitch": -22.55,
   "yaw": 71.62,
   "hfov": 9.66,
   "distance": 50
  }
 ],
 "id": "overlay_AEF6F510_B58C_117B_41D8_422DB0D5A80D",
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 71.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_0_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.55,
   "hfov": 9.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_D18DA319_C24A_7C36_41E1_9E7F6375BB90); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.41,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_1_0.png",
      "width": 344,
      "class": "ImageResourceLevel",
      "height": 350
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.86,
   "yaw": 36.75
  }
 ],
 "id": "overlay_AC6E0ACB_B58C_30EC_41E2_41132314EFCA",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 36.75,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.86,
   "hfov": 10.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273, this.camera_D19B1328_C24A_7C16_41E2_328FE1EABD41); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD12C2A6_BDE2_CE0A_41B3_70C7BCC951AF",
   "pitch": -21.7,
   "yaw": -18.07,
   "hfov": 13.96,
   "distance": 50
  }
 ],
 "id": "overlay_AC95861D_B58C_1365_41E3_7692D9258B2E",
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -18.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_2_0_0_map.gif",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.7,
   "hfov": 13.96
  }
 ]
},
{
 "class": "Label",
 "left": 0,
 "width": 239,
 "id": "Label_0C5F13A8_3BA0_A6FF_41BD_E3D21CFCE151",
 "fontFamily": "Montserrat",
 "paddingBottom": 0,
 "textShadowVerticalLength": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "top",
 "text": "360°",
 "borderRadius": 0,
 "minHeight": 1,
 "top": 5,
 "paddingRight": 0,
 "propagateClick": false,
 "height": 67,
 "textShadowBlurRadius": 10,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "fontSize": 54,
 "fontStyle": "normal",
 "textShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "textShadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "shadow": false,
 "fontWeight": "bold",
 "textDecoration": "none",
 "data": {
  "name": "text 1"
 },
 "textShadowOpacity": 1
},
{
 "class": "Label",
 "left": 0,
 "width": 271,
 "id": "Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
 "fontFamily": "Montserrat",
 "paddingBottom": 0,
 "textShadowVerticalLength": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "top",
 "text": "Casa 8 Condominio La Milla",
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "height": 31,
 "bottom": 0,
 "textShadowBlurRadius": 10,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "fontSize": 18,
 "fontStyle": "normal",
 "textShadowHorizontalLength": 0,
 "paddingLeft": 0,
 "textShadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "data": {
  "name": "text 2"
 },
 "textShadowOpacity": 1
},
{
 "class": "Label",
 "left": 76,
 "width": 450,
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "fontFamily": "Montserrat",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "text": "ΣΧ Studio",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "propagateClick": false,
 "height": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "fontSize": 31,
 "fontStyle": "normal",
 "paddingLeft": 0,
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "data": {
  "name": "Label Company Name"
 }
},
{
 "maxWidth": 50,
 "class": "Image",
 "left": 10,
 "maxHeight": 50,
 "id": "Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
 "paddingBottom": 0,
 "width": "100%",
 "url": "skin/Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50.png",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "logo"
 },
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "children": [
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "class": "Container",
 "width": 1199,
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "right": "0%",
 "contentOpaque": false,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarMargin": 2,
 "paddingRight": 15,
 "propagateClick": true,
 "height": 60,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 3,
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "paddingLeft": 0,
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Info"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Thumblist"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Location"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Floorplan"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed_rollover.png",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Realtor"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 101,
 "iconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93.png",
 "class": "IconButton",
 "maxHeight": 101,
 "width": 44,
 "id": "IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": true,
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93_rollover.png",
 "height": 44,
 "mode": "push",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton Video"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "class": "Container",
 "left": "15%",
 "shadowSpread": 1,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowColor": "#000000",
 "shadowBlurRadius": 25,
 "backgroundOpacity": 1,
 "right": "15%",
 "scrollBarColor": "#000000",
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "bottom": "10%",
 "horizontalAlign": "left",
 "gap": 0,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal"
},
{
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "class": "Container",
 "left": "15%",
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "right": "15%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 20,
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 10,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "vertical"
},
{
 "class": "Container",
 "left": "15%",
 "shadowSpread": 1,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "shadowBlurRadius": 25,
 "backgroundOpacity": 1,
 "right": "15%",
 "scrollBarColor": "#000000",
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "10%",
 "horizontalAlign": "center",
 "gap": 10,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "15%",
 "shadowSpread": 1,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "shadowColor": "#000000",
 "shadowBlurRadius": 25,
 "backgroundOpacity": 1,
 "right": "15%",
 "scrollBarColor": "#000000",
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "bottom": "10%",
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal"
},
{
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "class": "Container",
 "left": "15%",
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "right": "15%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 20,
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 10,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "vertical"
},
{
 "class": "Container",
 "left": "15%",
 "shadowSpread": 1,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "shadowColor": "#000000",
 "shadowBlurRadius": 25,
 "backgroundOpacity": 1,
 "right": "15%",
 "scrollBarColor": "#000000",
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "10%",
 "horizontalAlign": "center",
 "gap": 10,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "class": "Container",
 "left": "15%",
 "shadowSpread": 1,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "shadowBlurRadius": 25,
 "backgroundOpacity": 1,
 "right": "15%",
 "scrollBarColor": "#000000",
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "10%",
 "horizontalAlign": "center",
 "gap": 10,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "class": "Container",
 "left": "15%",
 "shadowSpread": 1,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowColor": "#000000",
 "shadowBlurRadius": 25,
 "backgroundOpacity": 1,
 "right": "15%",
 "scrollBarColor": "#000000",
 "verticalAlign": "top",
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "bottom": "10%",
 "horizontalAlign": "left",
 "gap": 0,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal"
},
{
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "class": "Container",
 "left": "15%",
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "right": "15%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "10%",
 "scrollBarMargin": 2,
 "paddingRight": 20,
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 10,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "vertical"
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD096293_BDE2_CE0A_41E1_4AF8D44D4065",
 "levels": [
  {
   "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD09C293_BDE2_CE0A_41D1_5510D52987C5",
 "levels": [
  {
   "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD221285_BDE2_CE0E_418D_2673A3FB725F",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD22D286_BDE2_CE0A_4191_07AAF07B55D1",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD22B286_BDE2_CE0A_41C8_498AE8EA25DA",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3B128A_BDE2_CE1A_41D0_2F6A86F5CE15",
 "levels": [
  {
   "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3BF28A_BDE2_CE1A_41E4_CDC79572FAD6",
 "levels": [
  {
   "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD15F2A7_BDE2_CE0A_41E4_7DDFC11F80C7",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1472A7_BDE2_CE0A_41C7_37F64742BF16",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD14F2A8_BDE2_CE06_41CF_E961FCBE35FC",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD27F287_BDE2_CE0A_41E3_F74EA0E34C83",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD261287_BDE2_CE0A_41D1_AE5E3051BDA8",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD26C287_BDE2_CE0A_41E0_9F88616932B6",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD268287_BDE2_CE0A_41E2_BC3256944030",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_4_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD396289_BDE2_CE06_41E1_F2086A1C1618",
 "levels": [
  {
   "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_ACE802AA_BDE2_CE1A_41D4_75958B53831E",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_ACE8B2AA_BDE2_CE1A_41E4_5B0D5AF291E4",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD30E28F_BDE2_CE1A_41DB_A7CC68CB998B",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD33728F_BDE2_CE1A_41C9_0F370E6C4D86",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_1_0.png",
   "width": 560,
   "class": "ImageResourceLevel",
   "height": 540
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD33A290_BDE2_CE06_41C1_B37CC0867E63",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD320290_BDE2_CE06_41D4_71E97C43F482",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD328290_BDE2_CE06_41D9_630C403BD6B8",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_5_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD35D291_BDE2_CE06_41E0_CD752E25D1E3",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD35A291_BDE2_CE06_41CB_4D7202663A9E",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_7_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD30828E_BDE2_CE1A_41DF_1D1594E442C4",
 "levels": [
  {
   "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD33628E_BDE2_CE1A_41D5_0709E71A376D",
 "levels": [
  {
   "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD03D299_BDE2_CE06_41CD_1EAC745445DA",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD02529A_BDE2_CE3A_41BD_24A94CA808D2",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_1_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD02329A_BDE2_CE3A_41C6_87621635BCBC",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD02B29A_BDE2_CE3A_41DE_26BC7B7A97CC",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD05029B_BDE2_CE3A_41E1_14155B6B37D7",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD05829B_BDE2_CE3A_4179_1DA156A3C418",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD39B289_BDE2_CE06_41D1_57294DBB3961",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD386289_BDE2_CE06_41DA_5BBF33A51C4A",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD38D28A_BDE2_CE1A_41C4_8427A791ABBC",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD26A288_BDE2_CE06_41CD_B7275D98BEEB",
 "levels": [
  {
   "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0D7296_BDE2_CE0A_4184_FC5B749293A2",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0C4296_BDE2_CE0A_41D5_AB63CFD01ABC",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD0CC296_BDE2_CE0A_41C4_0C1EF988A580",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0F5297_BDE2_CE0A_41A1_9B4B27A9EEAB",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_4_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0F2297_BDE2_CE0A_41E2_0B41D89AE887",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0FB297_BDE2_CE0A_41D0_330763397828",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0E3298_BDE2_CE06_41DD_CCC89305E45F",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_7_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0E9298_BDE2_CE06_41C2_41E072C6C4E4",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0AC295_BDE2_CE0E_41E6_12940E1B0762",
 "levels": [
  {
   "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3F728C_BDE2_CE1E_418C_A44DB0980762",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD3F228C_BDE2_CE1E_41DE_B48C7EDB2C96",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3F828D_BDE2_CE1E_41D2_BA98984565F9",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD3E128D_BDE2_CE1E_41E6_F2AC9F0BF237",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1572A6_BDE2_CE0A_41BC_800B0C6EEC1C",
 "levels": [
  {
   "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD31128D_BDE2_CE1E_41B2_38CDAA87A140",
 "levels": [
  {
   "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_0_0.png",
   "width": 1040,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD208285_BDE2_CE0E_41CF_42EF013EA29E",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD235285_BDE2_CE0E_41E2_C02ADE1003FA",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD231285_BDE2_CE0E_41E2_BD1ABD23DDD7",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3D528B_BDE2_CE1A_419A_FB4219266FAF",
 "levels": [
  {
   "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3D228B_BDE2_CE1A_41CA_A52BAEF71DB4",
 "levels": [
  {
   "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD253286_BDE2_CE0A_41D9_4FD6E794C0A7",
 "levels": [
  {
   "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD16E2A9_BDE2_CE06_41E5_F63C8959731C",
 "levels": [
  {
   "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD04029B_BDE2_CE3A_41DF_77B425D6B3F0",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD07529B_BDE2_CE3A_41C8_AD0D6DD26DFA",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD07229C_BDE2_CE3E_41D3_E10116C753E2",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD07A29C_BDE2_CE3E_41D3_F13723D5AB5D",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_3_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD06229C_BDE2_CE3E_41D5_4D0FB60847B4",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_4_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD06B29D_BDE2_CE3E_41DD_52E11F43EA30",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD11C2A3_BDE2_CE0A_41D1_51CC382AC951",
 "levels": [
  {
   "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1052A3_BDE2_CE0A_41D9_789992D071B2",
 "levels": [
  {
   "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1FA2A2_BDE2_CE0A_41DA_073B71E84565",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1E22A2_BDE2_CE0A_418C_79A7A6A15941",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1152A3_BDE2_CE0A_41B5_AD4CFABBC030",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1D82A1_BDE2_CE06_41C7_4A50B9BECD4A",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1C02A1_BDE2_CE06_41E1_41CA0867DE01",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1C82A2_BDE2_CE0A_41C8_8E4D64B230C0",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1FD2A2_BDE2_CE0A_41E1_8C5ACD99881C",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_ACE912A9_BDE2_CE06_41C3_246836C215B4",
 "levels": [
  {
   "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_ACE992AA_BDE2_CE1A_41D0_731A362F58D7",
 "levels": [
  {
   "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3A528A_BDE2_CE1A_41D4_16EB6D72CBB5",
 "levels": [
  {
   "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3A228B_BDE2_CE1A_41D0_60C70DBAFFA9",
 "levels": [
  {
   "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_1_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3C228C_BDE2_CE1E_41DB_30E364C44D88",
 "levels": [
  {
   "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD034299_BDE2_CE06_41DC_3995C0FB5708",
 "levels": [
  {
   "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0A5295_BDE2_CE0E_415E_2D5BDDDBEF34",
 "levels": [
  {
   "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD31A28F_BDE2_CE1A_41E7_49538DABB241",
 "levels": [
  {
   "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD30028F_BDE2_CE1A_41D3_F0EBA04E6F89",
 "levels": [
  {
   "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD19629E_BDE2_CE3A_41E2_226357DF9B0A",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD19C29E_BDE2_CE3A_41DC_A2B1E6D03A64",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD18429F_BDE2_CE3A_41D8_968D9EC86F2B",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD18A29F_BDE2_CE3A_41E3_7F0C90A0F47B",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_4_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD016298_BDE2_CE06_41DB_6C900462E8D2",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD01F298_BDE2_CE06_41E4_851B14B13AE7",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD006299_BDE2_CE06_4171_75047919576B",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD00C299_BDE2_CE06_41C3_30B43AB1590F",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0A2295_BDE2_CE0E_41A5_134703E8586B",
 "levels": [
  {
   "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0A8295_BDE2_CE0E_41B5_4F90740A49B5",
 "levels": [
  {
   "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_1_0.png",
   "width": 560,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD39D288_BDE2_CE06_41D6_41D2A103463B",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD263288_BDE2_CE06_4186_C56DC784AAB2",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0B8295_BDE2_CE0E_41E5_DA516ADA771E",
 "levels": [
  {
   "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD0A1295_BDE2_CE0E_41D3_F631569555A3",
 "levels": [
  {
   "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD08E294_BDE2_CE0E_41E3_2B07D3592015",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD0B5294_BDE2_CE0E_41D5_D3C1F1928094",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD0BC294_BDE2_CE0E_41CD_5776A9DDE25E",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD343291_BDE2_CE06_41CE_1369FB100E75",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD34A292_BDE2_CE0A_41AA_DFBEFD5AF622",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD373292_BDE2_CE0A_41CB_55C0BEAC9096",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD378292_BDE2_CE0A_41E2_3A1C85C23AC5",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD366292_BDE2_CE0A_41B4_3FACCCA447F5",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD36E293_BDE2_CE0A_41E4_2A59C2C69E8D",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD09A293_BDE2_CE0A_41D1_5C36A9544420",
 "levels": [
  {
   "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD10E2A4_BDE2_CE0E_41E1_92E2BC7EEA15",
 "levels": [
  {
   "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1312A4_BDE2_CE0E_41E1_6705D6CE0BFB",
 "levels": [
  {
   "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1762A8_BDE2_CE06_41E6_07CEA8951F4F",
 "levels": [
  {
   "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD244286_BDE2_CE0A_41D4_8D9E8B17C242",
 "levels": [
  {
   "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3D828B_BDE2_CE1A_41D5_57FF3050E050",
 "levels": [
  {
   "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3C728C_BDE2_CE1E_41B5_919F2A837FFB",
 "levels": [
  {
   "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD21F283_BDE2_CE0A_41E6_71622AF69DA7",
 "levels": [
  {
   "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD204284_BDE2_CE0E_41D2_40269B2C3056",
 "levels": [
  {
   "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1392A4_BDE2_CE0E_41CA_CDDFDB858541",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1272A5_BDE2_CE0E_41E1_845200C9D85A",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1292A5_BDE2_CE0E_41B7_E241275F14B6",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 21,
 "id": "AnimatedImageResource_AD31A28E_BDE2_CE1A_41E3_9FAC6A16E21A",
 "levels": [
  {
   "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD30128E_BDE2_CE1A_41E1_6A64D3AB5A05",
 "levels": [
  {
   "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD06129D_BDE2_CE3E_41D4_39F74D680D6B",
 "levels": [
  {
   "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1B329F_BDE2_CE3A_41DC_A35F0A822B23",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1BA2A0_BDE2_CE06_41E3_3FB79B8F5367",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1A32A0_BDE2_CE06_41D9_F1F8A9C1B001",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1D32A1_BDE2_CE06_41E1_4DD344BC13D8",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_4_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3E828D_BDE2_CE1E_41C8_C4FF95DC4162",
 "levels": [
  {
   "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_1_0.png",
   "width": 1040,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD3B528A_BDE2_CE1A_41E0_6A5A448B7C91",
 "levels": [
  {
   "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD1572A5_BDE2_CE0E_41E5_03FB6ED51534",
 "levels": [
  {
   "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_AD12C2A6_BDE2_CE0A_41B3_70C7BCC951AF",
 "levels": [
  {
   "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_2_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "fontFamily": "Montserrat",
 "popUpShadow": false,
 "popUpBackgroundOpacity": 0,
 "class": "DropDown",
 "popUpPaddingBottom": 10,
 "arrowColor": "#FFFFFF",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "popUpGap": 2,
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "paddingBottom": 0,
 "width": 200,
 "backgroundOpacity": 0,
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "popUpPaddingTop": 10,
 "popUpBackgroundColor": "#F7931E",
 "borderRadius": 0,
 "minHeight": 1,
 "popUpShadowBlurRadius": 6,
 "paddingRight": 15,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "popUpShadowOpacity": 0,
 "height": "100%",
 "minWidth": 1,
 "popUpBorderRadius": 5,
 "popUpShadowColor": "#000000",
 "fontSize": "16px",
 "horizontalAlign": "center",
 "popUpFontColor": "#FFFFFF",
 "gap": 0,
 "popUpPaddingLeft": 15,
 "borderSize": 0,
 "label": "ESCENAS",
 "fontStyle": "normal",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "paddingLeft": 15,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "DropDown 2"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "shadow": false,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#CE6700"
},
{
 "fontFamily": "Montserrat",
 "popUpShadow": false,
 "popUpBackgroundOpacity": 0,
 "class": "DropDown",
 "popUpPaddingBottom": 10,
 "arrowColor": "#FFFFFF",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "popUpGap": 2,
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
 "paddingBottom": 0,
 "width": 200,
 "backgroundOpacity": 0,
 "playList": "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "popUpPaddingTop": 10,
 "popUpBackgroundColor": "#F7931E",
 "borderRadius": 0,
 "minHeight": 1,
 "popUpShadowBlurRadius": 6,
 "paddingRight": 15,
 "propagateClick": false,
 "height": 60,
 "backgroundColorRatios": [
  0
 ],
 "popUpShadowOpacity": 0,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "popUpBorderRadius": 0,
 "label": "PISCINA",
 "popUpShadowColor": "#000000",
 "fontSize": "16px",
 "horizontalAlign": "center",
 "popUpFontColor": "#FFFFFF",
 "gap": 0,
 "popUpPaddingLeft": 15,
 "borderSize": 0,
 "fontStyle": "normal",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "paddingLeft": 15,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "DropDown 5"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "shadow": false,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "selectedPopUpBackgroundColor": "#CE6700"
},
{
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "class": "Button",
 "shadowSpread": 1,
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "fontFamily": "Arial",
 "paddingBottom": 0,
 "iconWidth": 17,
 "width": 60,
 "iconHeight": 17,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "height": 60,
 "backgroundColorRatios": [
  0
 ],
 "mode": "toggle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "pressedRollOverIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed_rollover.png",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "data": {
  "name": "Button Settings"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal"
},
{
 "class": "Container",
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "backgroundOpacity": 1,
 "width": "85%",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "width": 8,
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "paddingBottom": 20,
 "contentOpaque": false,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "backgroundOpacity": 1,
 "width": "50%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 50,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": "100%",
 "minWidth": 460,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 50,
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#0069A3",
 "layout": "vertical"
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "paddingBottom": 0,
 "width": "25%",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "borderRadius": 0,
 "minHeight": 50,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "height": "75%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "pressedRollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed_rollover.jpg",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "class": "Container",
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": 140,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "itemHeight": 160,
 "itemLabelFontWeight": "normal",
 "class": "ThumbnailGrid",
 "left": 0,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemLabelFontSize": 13,
 "paddingBottom": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "verticalAlign": "middle",
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "width": "100%",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "borderRadius": 5,
 "minHeight": 1,
 "itemLabelFontColor": "#666666",
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "paddingRight": 70,
 "itemThumbnailHeight": 125,
 "height": "92%",
 "minWidth": 1,
 "rollOverItemLabelFontColor": "#F7931E",
 "itemThumbnailOpacity": 1,
 "itemPaddingRight": 3,
 "borderSize": 0,
 "gap": 26,
 "scrollBarWidth": 10,
 "itemVerticalAlign": "top",
 "itemPaddingBottom": 3,
 "itemBackgroundOpacity": 0,
 "itemBackgroundColorDirection": "vertical",
 "paddingLeft": 70,
 "itemLabelFontStyle": "normal",
 "itemThumbnailWidth": 220,
 "scrollBarOpacity": 0.5,
 "paddingTop": 10,
 "itemOpacity": 1,
 "itemLabelHorizontalAlign": "center",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "itemLabelFontFamily": "Montserrat",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemMode": "normal",
 "selectedItemLabelFontColor": "#F7931E",
 "scrollBarColor": "#F7931E",
 "itemBorderRadius": 0,
 "itemMaxHeight": 1000,
 "itemMaxWidth": 1000,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "itemLabelPosition": "bottom",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "propagateClick": false,
 "selectedItemThumbnailShadow": true,
 "bottom": -0.2,
 "itemHorizontalAlign": "center",
 "itemBackgroundColor": [],
 "itemThumbnailBorderRadius": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemPaddingTop": 3,
 "itemLabelGap": 7,
 "itemBackgroundColorRatios": [],
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "horizontalAlign": "center",
 "selectedItemLabelFontWeight": "bold",
 "data": {
  "name": "ThumbnailList"
 },
 "itemThumbnailShadow": false,
 "itemWidth": 220,
 "itemLabelTextDecoration": "none",
 "itemMinHeight": 50
},
{
 "class": "WebFrame",
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "paddingBottom": 0,
 "width": "100%",
 "backgroundOpacity": 1,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "insetBorder": false,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollEnabled": true
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "paddingBottom": 0,
 "width": "25%",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "borderRadius": 0,
 "minHeight": 50,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "height": "75%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "class": "ViewerArea",
 "toolTipBorderSize": 1,
 "id": "MapViewer",
 "toolTipPaddingRight": 10,
 "paddingBottom": 0,
 "width": "100%",
 "progressBorderRadius": 0,
 "progressBorderSize": 0,
 "toolTipPaddingTop": 20,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 10,
 "playbackBarHeadShadowHorizontalLength": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "minHeight": 1,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "13px",
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 10,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "transitionMode": "blending",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF"
},
{
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "class": "Container",
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "height": 140,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "class": "Container",
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": "100%",
 "minWidth": 1,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container photo"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "backgroundOpacity": 1,
 "width": "55%",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "center",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-left"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "width": 8,
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "class": "Container",
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "paddingBottom": 20,
 "contentOpaque": false,
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "backgroundOpacity": 1,
 "width": "45%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 60,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": "100%",
 "minWidth": 460,
 "overflow": "visible",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 60,
 "scrollBarOpacity": 0.51,
 "data": {
  "name": "-right"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#0069A3",
 "layout": "vertical"
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "paddingBottom": 0,
 "width": "25%",
 "backgroundOpacity": 0,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "borderRadius": 0,
 "minHeight": 50,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "height": "75%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "pressedRollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed_rollover.jpg",
 "paddingLeft": 0,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 2000,
 "class": "Image",
 "left": "0%",
 "maxHeight": 1000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "paddingBottom": 0,
 "width": "100%",
 "backgroundOpacity": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "photo"
 },
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "shadow": false
},
{
 "class": "Container",
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": 60,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "class": "Container",
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "paddingBottom": 30,
 "contentOpaque": false,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 520,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": "100%",
 "minWidth": 100,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#E73B2C",
 "layout": "vertical"
},
{
 "class": "Container",
 "width": 370,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": 40,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "paddingBottom": 0,
 "width": "100%",
 "backgroundOpacity": 0,
 "right": 20,
 "cursor": "hand",
 "verticalAlign": "top",
 "transparencyActive": false,
 "borderRadius": 0,
 "minHeight": 50,
 "top": 20,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "height": "36.14%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "pressedRollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed_rollover.jpg",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "paddingBottom": 0,
 "width": "100%",
 "backgroundOpacity": 0,
 "right": 20,
 "cursor": "hand",
 "verticalAlign": "top",
 "transparencyActive": false,
 "borderRadius": 0,
 "minHeight": 50,
 "top": 20,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "height": "36.14%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "class": "ViewerArea",
 "left": "0%",
 "toolTipBorderSize": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "toolTipPaddingRight": 10,
 "paddingBottom": 0,
 "width": "100%",
 "progressBorderRadius": 0,
 "progressBorderSize": 0,
 "toolTipPaddingTop": 20,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 10,
 "playbackBarHeadShadowHorizontalLength": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "minHeight": 1,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "displayTooltipInTouchScreens": true,
 "paddingRight": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "13px",
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 10,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "top": "0%",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "transitionMode": "blending",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF"
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "class": "IconButton",
 "left": 10,
 "maxHeight": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "paddingBottom": 0,
 "width": "14.22%",
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 50,
 "top": "20%",
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "bottom": "20%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed_rollover.png",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton <"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "paddingBottom": 0,
 "width": "14.22%",
 "right": 10,
 "cursor": "hand",
 "verticalAlign": "middle",
 "transparencyActive": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 50,
 "top": "20%",
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "bottom": "20%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed_rollover.png",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton >"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "paddingBottom": 0,
 "width": "10%",
 "backgroundOpacity": 0,
 "right": 20,
 "cursor": "hand",
 "verticalAlign": "top",
 "transparencyActive": false,
 "borderRadius": 0,
 "minHeight": 50,
 "top": 20,
 "paddingRight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "height": "10%",
 "mode": "push",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "right",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "pressedRollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed_rollover.jpg",
 "paddingLeft": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 2000,
 "class": "Image",
 "left": "0%",
 "maxHeight": 1000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "paddingBottom": 0,
 "width": "100%",
 "backgroundOpacity": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "verticalAlign": "bottom",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "data": {
  "name": "Image"
 },
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "shadow": false
},
{
 "class": "Container",
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "paddingBottom": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 0,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": 60,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "right",
 "gap": 0,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingTop": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "class": "Container",
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "paddingBottom": 30,
 "contentOpaque": false,
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 520,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": "100%",
 "minWidth": 100,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.79,
 "data": {
  "name": "Container text"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#E73B2C",
 "layout": "vertical"
},
{
 "class": "Container",
 "width": 370,
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": 40,
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "class": "HTMLText",
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "paddingBottom": 20,
 "width": "100%",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "paddingRight": 10,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.54vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.68vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:1.68vh;font-family:'Montserrat';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.94vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.94vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.94vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.68vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;font-family:'Montserrat';\"><B>DONEC FEUGIAT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.47vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.68vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;font-family:'Montserrat';\"><B>LOREM IPSUM:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:2.62vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#F7931E"
},
{
 "class": "Button",
 "shadowSpread": 1,
 "width": 180,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "fontFamily": "Montserrat",
 "paddingBottom": 0,
 "iconWidth": 32,
 "iconHeight": 32,
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0.8,
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "borderRadius": 0,
 "minHeight": 1,
 "borderColor": "#000000",
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundColorRatios": [
  0
 ],
 "mode": "push",
 "height": 50,
 "minWidth": 1,
 "label": "LOREM IPSUM",
 "pressedBackgroundOpacity": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.96vh",
 "backgroundColorDirection": "vertical",
 "fontStyle": "normal",
 "paddingLeft": 0,
 "data": {
  "name": "Button Lorem Ipsum"
 },
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "fontWeight": "bold",
 "pressedBackgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal"
},
{
 "class": "HTMLText",
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "paddingBottom": 10,
 "width": "100%",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "height": "45%",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.54vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV></div>",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText18899"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#04A3E1"
},
{
 "class": "Container",
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "paddingBottom": 0,
 "contentOpaque": false,
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "backgroundOpacity": 0.3,
 "width": "100%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "height": "80%",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- content"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "horizontal"
},
{
 "maxWidth": 200,
 "class": "Image",
 "maxHeight": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "paddingBottom": 0,
 "width": "25%",
 "backgroundOpacity": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "verticalAlign": "top",
 "borderRadius": 0,
 "minHeight": 1,
 "paddingRight": 0,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "data": {
  "name": "agent photo"
 },
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "class": "HTMLText",
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "paddingBottom": 10,
 "width": "75%",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "paddingRight": 10,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:1.99vh;font-family:'Montserrat';\"><B>JOHN DOE</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.47vh;font-family:'Montserrat';\">LICENSED REAL ESTATE SALESPERSON</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.94vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.94vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.94vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.94vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText19460"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#F7931E"
}],
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Player468"
 },
 "paddingTop": 0,
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
