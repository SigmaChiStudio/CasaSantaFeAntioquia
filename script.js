(function(){
    var script = {
 "horizontalAlign": "left",
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
 "id": "rootPlayer",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "defaultVRPointer": "laser",
 "scripts": {
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "registerKey": function(key, value){  window[key] = value; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "unregisterKey": function(key){  delete window[key]; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "existsKey": function(key){  return key in window; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getKey": function(key){  return window[key]; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); }
 },
 "layout": "absolute",
 "paddingRight": 0,
 "downloadEnabled": false,
 "borderSize": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "width": "100%",
 "minHeight": 20,
 "borderRadius": 0,
 "overflow": "visible",
 "propagateClick": true,
 "verticalAlign": "top",
 "minWidth": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "desktopMipmappingEnabled": false,
 "height": "100%",
 "definitions": [{
 "items": [
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -165.92,
  "pitch": -0.62,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 152.03,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD653A8A_BDE2_FE1A_4197_6FAE590E7352",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -161.03,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AE9B7906_BDE2_FA0A_41E0_C0D0A19469FE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -104.27,
  "pitch": -0.96,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Pasillo exterior 1",
 "id": "panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
 "thumbnailUrl": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -90.44,
   "distance": 1,
   "backwardYaw": -104.77,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "yaw": 18.97,
   "distance": 1,
   "backwardYaw": -174.39,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3E15370_B58C_11BC_41E6_4C27776DF80D",
  "this.overlay_ACFC9CC8_B58C_10EB_41E2_29DDE0C71B35"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -128.19,
  "pitch": -14.32,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -115.76,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -47.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "label": "Terraza 1",
 "id": "panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
 "thumbnailUrl": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": -133.51,
   "distance": 1,
   "backwardYaw": 22.45,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": -135.13,
   "distance": 1,
   "backwardYaw": -60.71,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A225C117_B29C_DE05_41E0_0C4CE54E91DE",
  "this.overlay_A63B2BE4_B6D5_A5F4_4193_343AED842967"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -56.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACE1469E_BDE2_F63A_41D8_4C9747AC2EA0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Cocina",
 "id": "panorama_BCF619F2_B294_2E1F_41E2_371766686094",
 "thumbnailUrl": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": -158.98,
   "distance": 1,
   "backwardYaw": 20.09,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "yaw": 108.85,
   "distance": 1,
   "backwardYaw": -64.58,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": -157.73,
   "distance": 1,
   "backwardYaw": -124.46,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6DC1EB1_B374_221D_41DE_D83EFBFFB4E6",
  "this.overlay_A7563243_B374_227D_41C1_948A1F8F4998",
  "this.overlay_8FA0D115_B74B_6254_41E5_98CB9C7406C4",
  "this.overlay_A3C42F48_B856_69D5_41DF_8253C2CD632F"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Ducha Habitaci\u00f3n Piso 1",
 "id": "panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
 "thumbnailUrl": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "yaw": -69.85,
   "distance": 1,
   "backwardYaw": 100.94,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A79FC131_B3BD_DE1D_41CB_6D0DB5D6FBA8",
  "this.overlay_A6640D08_B3BC_260B_41DC_5121CDCA6EA7"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Terraza 4",
 "id": "panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
 "thumbnailUrl": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": 20.87,
   "distance": 1,
   "backwardYaw": 101.76,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A1D575FB_B294_660D_41E6_37913D75622D"
 ],
 "partial": false
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Piscina 4",
 "id": "panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
 "thumbnailUrl": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 53.3,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD38866D_BDE2_F61E_41E2_4D7468BCB217",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 22.27,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B252D548_BDE2_CA06_41D5_E194B02ED482",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Entrada 2",
 "id": "panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
 "thumbnailUrl": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -150.88,
   "distance": 1,
   "backwardYaw": -5.69,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": 18.72,
   "distance": 1,
   "backwardYaw": -116.43,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3B03E31_B594_13BD_41D3_974DC13A7193",
  "this.overlay_A386E8BA_B594_70AC_41E4_A461BFCF4CD8",
  "this.overlay_A39912AD_B594_10A5_41DC_4C47E8D4EB26"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 129,
  "yaw": -179.95,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B24FB51F_BDE2_CA3A_41E5_1C06FF4F5B28",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -137.73,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD126692_BDE2_F60A_41C8_29E60E1F3DAE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -79.06,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADA1D5DB_BDE2_CA3A_41CD_6A5ABA852FDC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 96.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF9AF412_BDE2_CA0A_41A6_425EC9D855AC",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 7.36,
    "yawSpeed": 13.78,
    "targetYaw": 45.2,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "label": "Escaleras Piso 2",
 "id": "panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
 "thumbnailUrl": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -23.44,
   "distance": 1,
   "backwardYaw": -165.37,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 0.05,
   "distance": 1,
   "backwardYaw": 49.53,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6E6238D_B28C_220A_41E3_B57DEA725058",
  "this.overlay_A6CDE92C_B28C_2E0A_4194_F30F37CAF4C8"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Ducha Habitaci\u00f3n S Piso 2",
 "id": "panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
 "thumbnailUrl": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "yaw": -118.33,
   "distance": 1,
   "backwardYaw": 48.26,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6E80BC6_B2FC_6206_41D6_C9A2D50EB19B",
  "this.overlay_A900D003_B6F4_E233_41E0_F870378D67EA"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -92.53,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B219C57F_BDE2_CAFA_41D0_9C7958FC495A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -118.75,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADBBA5E9_BDE2_CA06_41DB_926B36DDE642",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 127,
  "yaw": 47.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF499438_BDE2_CA06_41D3_3628D01080E4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 129,
  "yaw": -22.39,
  "pitch": -5.46,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 127,
  "yaw": -131.74,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADE1C9FA_BDE2_FDFA_41DC_32DB763FA679",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 51.65,
  "pitch": 3.53,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Patio 2",
 "id": "panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
 "thumbnailUrl": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": 36.75,
   "distance": 1,
   "backwardYaw": -81.16,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "yaw": -18.07,
   "distance": 1,
   "backwardYaw": 179.83,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "yaw": 71.62,
   "distance": 1,
   "backwardYaw": -120.41,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AEF6F510_B58C_117B_41D8_422DB0D5A80D",
  "this.overlay_AC6E0ACB_B58C_30EC_41E2_41132314EFCA",
  "this.overlay_AC95861D_B58C_1365_41E3_7692D9258B2E"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Habitacion P 1 Piso 2",
 "id": "panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
 "thumbnailUrl": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "yaw": 73.73,
   "distance": 1,
   "backwardYaw": -95.09,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -107.82,
   "distance": 1,
   "backwardYaw": 10.45,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "yaw": 154.73,
   "distance": 1,
   "backwardYaw": -83.52,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A157E29E_B294_2207_41DB_A8AFF0017D7B",
  "this.overlay_A7E706F3_B294_621D_41E5_19D2605D803E",
  "this.overlay_A7515888_B294_2E0B_41E6_514DE0AF929D"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -71.95,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFDF13DE_BDE2_CE3A_41E3_487344CA7D49",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Pasillo exterior 2",
 "id": "panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
 "thumbnailUrl": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "yaw": 4.53,
   "distance": 1,
   "backwardYaw": 52.97,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "yaw": -174.39,
   "distance": 1,
   "backwardYaw": 18.97,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3BE4913_B58C_117D_41D2_272BE5657E02",
  "this.overlay_AC6CF670_B58C_13BB_41E5_7D3E6F2E0DCC"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -130.47,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC44D342_BDE2_CE0A_41D6_1A88FA43BA26",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Escaleras Piso 1",
 "id": "panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
 "thumbnailUrl": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": -126.7,
   "distance": 1,
   "backwardYaw": -150.57,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "yaw": 49.53,
   "distance": 1,
   "backwardYaw": 0.05,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "yaw": 92.15,
   "distance": 1,
   "backwardYaw": 133.96,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -27.16,
   "distance": 1,
   "backwardYaw": 132.33,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": -124.46,
   "distance": 1,
   "backwardYaw": -157.73,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "yaw": 146.95,
   "distance": 1,
   "backwardYaw": 70.43,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
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
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 81.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B2139589_BDE2_CA06_41E0_8415C275F09D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Terraza 3",
 "id": "panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
 "thumbnailUrl": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "yaw": 22.45,
   "distance": 1,
   "backwardYaw": -133.51,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "yaw": 101.76,
   "distance": 1,
   "backwardYaw": 20.87,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": 21.66,
   "distance": 1,
   "backwardYaw": 91.25,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A1102A1B_B294_620E_41C6_0AFD68920E5F",
  "this.overlay_A6E69AE0_B294_223B_41E1_8EA28F4153E5",
  "this.overlay_A118C749_B294_620D_41D9_311280482196"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -24.46,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD805604_BDE2_F60E_41DA_421DA8B8AB3F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 29.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B20949A2_BDE2_FA0A_41DD_5856B51968F2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -120.21,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC18B78E_BDE2_F61A_41D8_5030A1F55371",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -173.14,
  "pitch": 1.91,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -26.39,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD094679_BDE2_F606_41D3_949F1A3C4FDD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 15.98,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADCE7A1F_BDE2_FE3A_41CD_0D9DBC4AC119",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -137.07,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEAB88E0_BDE2_FA06_41C3_A58DF549A539",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -139.29,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF837829_BDE2_FA06_41D6_EFB184C3F384",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 32.59,
  "pitch": -8.8,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -119.81,
  "pitch": 9.37,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 32.49,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD32EAD5_BDE2_FE0E_41E6_9F162D22E8B8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -159.91,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF703851_BDE2_FA06_41E3_86158817EA31",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.15,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B239D97D_BDE2_FAFE_41D2_9829442AD6DB",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 22.97,
    "yawSpeed": 45.14,
    "targetYaw": -177.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 46, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 56.83,
  "pitch": 12.47,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 71.07,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD5AFAB1_BDE2_FE06_41DD_9DFF55A31DAC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Solar",
 "id": "panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
 "thumbnailUrl": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": -131.83,
   "distance": 1,
   "backwardYaw": -60.76,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A35C1888_B69C_3F6B_41DC_F150EEDBD9B3"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -11.09,
  "pitch": -2.49,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -33.14,
  "pitch": 9.64,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -161.28,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC923704_BDE2_F60E_41D9_BC4F04E22B19",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -148.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B272E504_BDE2_CA0E_41C5_8FBEA6E60216",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -31.74,
  "pitch": -1.08,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -118.72,
  "pitch": 1.94,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -108.38,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD69DA7E_BDE2_FEFA_41DA_13B3F3663F18",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 119.29,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B212A9E1_BDE2_FA06_41CB_89EBBDFF9DBC",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 19.28,
    "yawSpeed": 37.74,
    "targetYaw": -177.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 129,
  "yaw": 156.56,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEF2849D_BDE2_CA3E_41E6_CFCCD3960EED",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 128,
  "yaw": -79.1,
  "pitch": -1.01,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -169.55,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFBDA3F8_BDE2_CE06_41E1_C34C7B12B174",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 30.21,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF2EB877_BDE2_FA0A_41DA_3995B07B9A29",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 66.91,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF369469_BDE2_CA06_41CE_D6CC47CCFD24",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 89.5,
    "yawSpeed": 178.83,
    "targetYaw": -128.19,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.32,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -115.76,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -47.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 15.91,
  "pitch": 3.99,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 57.48,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.05,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 179.69,
  "pitch": -0.26,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 36.21,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADF585A8_BDE2_CA06_41E2_EB08E2600D40",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 75.66,
    "yawSpeed": 151.01,
    "targetYaw": -128.19,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.32,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -115.76,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -47.55,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 52, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "hfov": 360,
 "label": "Ducha Habitaci\u00f3n P Piso 2",
 "id": "panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
 "thumbnailUrl": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "yaw": -67.45,
   "distance": 1,
   "backwardYaw": 78.9,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A151E8BA_B294_EE0C_41D7_D78A106E34D6",
  "this.overlay_A1330E00_B2F4_65FB_41DB_A2656859E799"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Habitaci\u00f3n 2 Piso 1",
 "id": "panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
 "thumbnailUrl": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -50.11,
   "distance": 1,
   "backwardYaw": 117.82,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A66E5240_B3B4_227A_41D4_EFF40490AE9A"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 153.96,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADD80A2B_BDE2_FE1A_41E0_2BD6224BA7D6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -151.42,
  "pitch": 9.02,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 29.99,
  "pitch": -7.19,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -101.1,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFD2D7F2_BDE2_F60A_41E7_1D32EBA2C547",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 14.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC7A4318_BDE2_CE06_41A1_C76D4322AC32",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 4.8,
    "yawSpeed": 8.64,
    "targetYaw": 45.2,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -41.19,
  "pitch": -0.38,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Habitaci\u00f3n 3 Piso 1",
 "id": "panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
 "thumbnailUrl": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -49.2,
   "distance": 1,
   "backwardYaw": 31.2,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A639D286_B38C_2207_41E0_B4CD2BCB7DDA",
  "this.overlay_84CA4BFE_B73C_A5D5_41B3_056930E024CD"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -154.91,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADBA6A4F_BDE2_FE1A_41D3_F2F1E7B70B19",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 89.56,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B20DB9AF_BDE2_FA1A_41B5_4CA3AA51DA3A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 174.31,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD6B3620_BDE2_F606_41E0_A154E5B817F4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 48.79,
  "pitch": -0.47,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 84.91,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFAF13EB_BDE2_CE1A_41E5_2E2B89E0C9D2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 123.45,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACB746EA_BDE2_F61A_41E7_85C90D6EA802",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 44.87,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADEFD594_BDE2_CA0E_41E1_6B8E4E1CF08A",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 3.39,
    "yawSpeed": 5.8,
    "targetYaw": 22.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 6.35,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -136.07,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -12.41,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 127.05,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFC457E0_BDE2_F606_41E1_C828A20AC320",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 97.3,
  "pitch": 3.18,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Habitaci\u00f3n S 1 Piso 2",
 "id": "panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
 "thumbnailUrl": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -127.24,
   "distance": 1,
   "backwardYaw": 87.47,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "yaw": 52.42,
   "distance": 1,
   "backwardYaw": -98.88,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6F9F7B9_B2FC_220D_41E4_E34396F194F3",
  "this.overlay_A6EB9B77_B2FC_2205_41E0_A090AA0C43CD"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -127.03,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AE8B58FA_BDE2_FBFA_41CA_CADA913D9C77",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Pasillo Piso 2",
 "id": "panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
 "thumbnailUrl": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "yaw": 10.84,
   "distance": 1,
   "backwardYaw": 59.91,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "yaw": 171.37,
   "distance": 1,
   "backwardYaw": -113.09,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -83.22,
   "distance": 1,
   "backwardYaw": -85.39,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": 92.36,
   "distance": 1,
   "backwardYaw": -164.86,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "yaw": -165.37,
   "distance": 1,
   "backwardYaw": -23.44,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A11A94FB_B29C_E60D_41D0_8D8502D57E81",
  "this.overlay_A1456C90_B29C_261B_41BD_F9A10C71356D",
  "this.overlay_A11564EB_B29C_260D_41D5_6A4CE8C0A213",
  "this.overlay_A2A67653_B6CF_AED3_41E6_804ACA3BFEA0",
  "this.overlay_A3E7C0A3_B6CC_A273_41D1_B060EF130F1E"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 129,
  "yaw": -9.26,
  "pitch": -8.54,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": 43.2,
  "pitch": -3.92,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -125.19,
  "pitch": 7.16,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 32.42,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC5CD739_BDE2_F606_41C9_66106349705D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -78.24,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD80EA68_BDE2_FE06_41E7_A6DEF3A1B617",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 10.04,
    "yawSpeed": 19.16,
    "targetYaw": 9.54,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 7.92,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -50.12,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFA2B805_BDE2_FA0E_41E6_CCACD04FE6C3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -138.69,
  "pitch": -2.79,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 119.24,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF599444_BDE2_CA0E_41E2_ED939413EAE1",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 106.74,
  "pitch": -3.26,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 63.57,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD67A62D_BDE2_F61E_41A2_B43E680D5C3D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -120.09,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF26B45E_BDE2_CA3A_41E2_30DC4EC98DA5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Sala 2 Piso 2",
 "id": "panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
 "thumbnailUrl": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "yaw": -34.84,
   "distance": 1,
   "backwardYaw": -164.02,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "yaw": -133.62,
   "distance": 1,
   "backwardYaw": -26.04,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6F613F2_B2F4_221F_41C4_11EC6A5D6BC3",
  "this.overlay_A66E538A_B2F4_E20F_41BD_C6E949D03F29"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 75.23,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD74563B_BDE2_F67B_41E5_AF1BA5C62A6F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -95.64,
  "pitch": 10.2,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Sala 3 Piso 2",
 "id": "panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
 "thumbnailUrl": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "yaw": -164.02,
   "distance": 1,
   "backwardYaw": -34.84,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6C644CF_B2F5_E605_41C2_03F4FA4A3D05",
  "this.overlay_A11C2CBC_B2F4_660B_41C3_9754038D0D88"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -106.27,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF932837_BDE2_FA0A_41CB_3573A121DAF2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Pasillo 2 Piso 1",
 "id": "panorama_BCF67E95_B294_6205_41E6_4008DC577345",
 "thumbnailUrl": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -143.33,
   "distance": 1,
   "backwardYaw": 61.25,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 42.27,
   "distance": 1,
   "backwardYaw": -59.78,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 59.79,
   "distance": 1,
   "backwardYaw": 155.54,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 167.07,
   "distance": 1,
   "backwardYaw": 84.31,
   "class": "AdjacentPanorama"
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
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A581B76C_B294_220B_41E2_C3CF23E91DAD",
  "this.overlay_A581EE63_B294_223E_41B8_ACDF70FE7F79",
  "this.overlay_A5FBFFD5_B294_2205_41D6_BBFDC66D6532",
  "this.overlay_A60710B8_B293_DE0B_41D7_6A53A84E287E",
  "this.overlay_A591AD1C_B29C_260B_41E5_1609317911D1",
  "this.overlay_A3CE488B_B594_1F6D_41E2_DAF2A43D9141"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -109.57,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B22CA555_BDE2_CA0F_41E7_16D9F468BF10",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 94.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF142481_BDE2_CA06_41D7_BC258767EDDA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Patio 1",
 "id": "panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
 "thumbnailUrl": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": 179.83,
   "distance": 1,
   "backwardYaw": -18.07,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "yaw": 52.97,
   "distance": 1,
   "backwardYaw": 4.53,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_ACAA9B16_B58C_3164_41D1_D1A4B60E77C1",
  "this.overlay_A3AFA20C_B58C_136B_41DF_2BF4D20F8B28",
  "this.overlay_F9256439_B777_625C_41E6_18134498E027"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 54.94,
  "pitch": -2.69,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -33.05,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFB2B81C_BDE2_FA3F_41E2_A469AB3817BC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -9.53,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD2D7661_BDE2_F606_41D5_1DDFAB551B6F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Pasillo Habitaci\u00f3n Piso 1",
 "id": "panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
 "thumbnailUrl": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "yaw": 25.09,
   "distance": 1,
   "backwardYaw": -86.19,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -55.94,
   "distance": 1,
   "backwardYaw": -147.58,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 170.47,
   "distance": 1,
   "backwardYaw": 176.29,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 132.33,
   "distance": 1,
   "backwardYaw": -27.16,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "yaw": 129.88,
   "distance": 1,
   "backwardYaw": 75.27,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 155.54,
   "distance": 1,
   "backwardYaw": 59.79,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6539B97_B3BC_2206_41A5_D82F19533741",
  "this.overlay_A638CFC8_B3BC_E20B_41E4_7C1C4EF0DD77",
  "this.overlay_A789B760_B3BC_223B_41E4_5B607861AFEF",
  "this.overlay_9ED4A39C_B6D4_E655_41DB_8A29F7AA08A5",
  "this.overlay_9CDEF6CD_B6CB_AE34_41DA_8C081869FC02",
  "this.overlay_9E8069F2_B6CC_A5ED_41E4_CB4B70F88FB0"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -86.73,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B27174F6_BDE2_CA0A_41E4_115C1E8F7FF5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Habitaci\u00f3n S 2 Piso 2",
 "id": "panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
 "thumbnailUrl": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "yaw": -98.88,
   "distance": 1,
   "backwardYaw": 52.42,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A69FC48F_B2F4_2605_41B7_882B095D5499",
  "this.overlay_A6C350C4_B2F4_7E7B_41D9_ED8FC1575B96"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Ba\u00f1o Habitaci\u00f3n P Piso 2",
 "id": "panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
 "thumbnailUrl": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "yaw": 78.9,
   "distance": 1,
   "backwardYaw": -67.45,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -108.93,
   "distance": 1,
   "backwardYaw": 93.27,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6E4DD05_B294_6605_41E2_C92C885527A9",
  "this.overlay_A63AE262_B294_223F_41E4_134E4A27BD52"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 98.84,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEFD48B8_BDE2_FA05_41CB_CD320CA5D45D",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 19,
  "pitch": 4.06,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Piscina 2",
 "id": "panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
 "thumbnailUrl": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -147.51,
   "distance": 1,
   "backwardYaw": -114.84,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": -52.95,
   "distance": 1,
   "backwardYaw": 108.05,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A35DDE43_B694_13DD_41DA_B50490B813A5",
  "this.overlay_A34A230D_B69C_1164_41D2_523E9713FC6C"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Comedor 1",
 "id": "panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
 "thumbnailUrl": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "yaw": -27.97,
   "distance": 1,
   "backwardYaw": -149.79,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 61.19,
   "distance": 1,
   "backwardYaw": -60.26,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -81.16,
   "distance": 1,
   "backwardYaw": 36.75,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 123.19,
   "distance": 1,
   "backwardYaw": 12.05,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 61.25,
   "distance": 1,
   "backwardYaw": -143.33,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3F57B2F_B58C_31A5_41B1_C3B0D323E499",
  "this.overlay_A3ACC614_B58C_137B_41E1_232DBC95532F",
  "this.overlay_AC5CAF7E_B58C_11A7_41D5_27EB46ACF8EF",
  "this.overlay_A3FB9C62_B58C_17DF_41B2_2D2AE041D46F",
  "this.overlay_A3DD8EFE_B58C_70A7_41B4_362FA234601A",
  "this.overlay_A3D22D14_B594_117B_41E6_760EE19E43F8",
  "this.overlay_8B6BE10B_B75C_E233_41D1_BA093F4471F8"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 128,
  "yaw": -54.41,
  "pitch": -3.06,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 46.84,
  "pitch": -1.09,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -3.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC2C5750_BDE2_F606_41E4_F6A4A6BE0BE6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -0.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AECAE8C5_BDE2_FA0E_41CA_8858FB262BD3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Habitacion P 3 Piso 2",
 "id": "panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
 "thumbnailUrl": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "yaw": 114.67,
   "distance": 1,
   "backwardYaw": 40.71,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": -95.09,
   "distance": 1,
   "backwardYaw": 73.73,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A15EDDED_B28F_E605_41E3_95E1B137D21C",
  "this.overlay_A6361CB7_B28C_2605_41D8_2365410F49EF"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Sala 1",
 "id": "panorama_BCE37E62_B294_223E_41D5_683710308D0B",
 "thumbnailUrl": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": 12.05,
   "distance": 1,
   "backwardYaw": 123.19,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "yaw": -140.11,
   "distance": 1,
   "backwardYaw": 76.56,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 84.31,
   "distance": 1,
   "backwardYaw": 167.07,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3E111D5_B594_10E5_41C5_6E273440BC6E",
  "this.overlay_A3427BAC_B594_F0AB_41E3_584E8B987CCD",
  "this.overlay_A3FBFB39_B594_11AD_41D3_81E8CDCC1CFB",
  "this.overlay_F45FECC5_B754_A237_41E4_F91A927F2A47",
  "this.overlay_FE64F1A8_B757_627D_41E3_AD93A9EDCAFA"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 5.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD40D647_BDE2_F60A_4172_97F2317923BC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 139.73,
  "pitch": -2.87,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -157.55,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B218F9C9_BDE2_FA06_41E3_00384EF1EE93",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 18.15,
    "yawSpeed": 35.47,
    "targetYaw": 9.54,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 7.92,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "mouseControlMode": "drag_rotation",
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "buttonToggleHotspots": "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "viewerArea": "this.MainViewer",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 32.97,
  "pitch": 2.87,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 52.76,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF7B142B_BDE2_CA1A_41C4_AB47234F0D77",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Entrada",
 "id": "panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
 "thumbnailUrl": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 153.61,
   "distance": 1,
   "backwardYaw": 122.62,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "yaw": -5.69,
   "distance": 1,
   "backwardYaw": -150.88,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "yaw": -104.77,
   "distance": 1,
   "backwardYaw": -90.44,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": -5.39,
   "distance": 1,
   "backwardYaw": -113.28,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3459C80_B594_175B_41B0_B5016DEACF26",
  "this.overlay_A3EC57E4_B594_10DB_41E4_457C674F15AD",
  "this.overlay_A84D05ED_B594_10A4_41A9_DBA42200C405",
  "this.overlay_A3985956_B594_11E7_41D6_B17047DD216F"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 168.66,
  "pitch": 3.13,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 129,
  "yaw": 112.55,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEC2B4AA_BDE2_CA1B_41E2_1C684E2267AE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -103.44,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACFF16AA_BDE2_F61A_41DA_A70049193BE7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -137.3,
  "pitch": 0.26,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 176.89,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC638711_BDE2_F606_41D5_C9904896845A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -168.41,
  "pitch": 0.99,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Piscina 1",
 "id": "panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
 "thumbnailUrl": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "yaw": 42.93,
   "distance": 1,
   "backwardYaw": -170.83,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "yaw": -114.84,
   "distance": 1,
   "backwardYaw": -147.51,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AC08694A_B68C_31EF_41AF_C3038D9E6E8C",
  "this.overlay_A34189AB_B68C_10AD_41CD_E111D2202B16"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Ba\u00f1o Habitaci\u00f3n Piso 1",
 "id": "panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
 "thumbnailUrl": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -86.19,
   "distance": 1,
   "backwardYaw": 25.09,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "yaw": 100.94,
   "distance": 1,
   "backwardYaw": -69.85,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A677D88F_B3BC_2E05_41D7_EFC39973BFD7",
  "this.overlay_A66464B6_B3BC_E606_41CA_DE4D2DC1AF23"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 36.67,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEEC28AB_BDE2_FA1A_41E3_B8F960428EBC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 55.54,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF51586B_BDE2_FA1B_41D2_B3FDB92EB2A2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Jard\u00edn",
 "id": "panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
 "thumbnailUrl": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -120.41,
   "distance": 1,
   "backwardYaw": 71.62,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_ACE3D251_B574_13FD_41C9_3ED1B5AFE731"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -25.27,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF28F451_BDE2_CA06_41DA_80C13C9BCE53",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 130.8,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACA726DE_BDE2_F63A_41C1_E41EB41514E9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": 15.14,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEE4748E_BDE2_CA1A_41CD_3EB5CA4152A0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 174.61,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC8546F8_BDE2_F606_41E4_CCB1E3471E5B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 9.54,
  "pitch": 7.92,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -118.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD5E0654_BDE2_F60E_41CB_70C53886812B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -12.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACCBB6B9_BDE2_F606_41E2_0BE0BA7DF293",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 128,
  "yaw": 110.15,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADB4CA5C_BDE2_FE3D_41CB_B9C006A6E5B0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -159.13,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC03738C_BDE2_CE1E_4180_60269C196152",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 63.01,
    "yawSpeed": 125.6,
    "targetYaw": 15.91,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 3.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 57.48,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -14.05,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 68.55,
  "pitch": -2.33,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 128,
  "yaw": 61.67,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC71D71F_BDE2_F63A_41E0_F06E7A82C6D3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 48.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFF457CD_BDE2_F61E_41D5_A5ADFF0258D8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 115.42,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF4EE85D_BDE2_FA3E_41E4_AA4178B60563",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 29.43,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B2498512_BDE2_CA0A_41E6_A9396A8E4A98",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Escaleras Terraza",
 "id": "panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
 "thumbnailUrl": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -113.09,
   "distance": 1,
   "backwardYaw": 171.37,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": -143.79,
   "distance": 1,
   "backwardYaw": -0.85,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A116EB46_B29C_6207_41E0_442B55E89DA4",
  "this.overlay_A6EC268E_B29C_2207_41DB_EF3BE4C5AF26"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -65.33,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADF98A07_BDE2_FE0A_41D5_B6210CE6FACB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Sala 1 Piso 2",
 "id": "panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
 "thumbnailUrl": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": 59.91,
   "distance": 1,
   "backwardYaw": 10.84,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "yaw": -26.04,
   "distance": 1,
   "backwardYaw": -133.62,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A15A77A4_B28C_223B_41D4_961EBEF9520D",
  "this.overlay_A1426398_B28C_220B_41CF_5CB6C0F48471",
  "this.overlay_A1539037_B2F3_FE05_41D2_2E8B1531C992"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 138.42,
  "pitch": 1.77,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -87.85,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADAE2A43_BDE2_FE0A_41D9_DAA11954927B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 21.02,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD05E686_BDE2_F60A_41E2_FEB0FBFFD40E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Comedor 2",
 "id": "panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
 "thumbnailUrl": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -149.79,
   "distance": 1,
   "backwardYaw": -27.97,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3CA1829_B58C_1FAC_41D2_7D150963EF5A",
  "this.overlay_F74E4707_B75C_AE33_41CC_032D81451266"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Habitaci\u00f3n 1 Piso 1",
 "id": "panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
 "thumbnailUrl": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -147.58,
   "distance": 1,
   "backwardYaw": -55.94,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "yaw": 117.82,
   "distance": 1,
   "backwardYaw": -50.11,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "yaw": 31.2,
   "distance": 1,
   "backwardYaw": -49.2,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A66A75AE_B3BC_2607_41E0_99495DC1CE0C",
  "this.overlay_A66EEB8F_B3B4_2206_41D9_B472B986BFC2",
  "this.overlay_A65E32F1_B3B4_E21A_41E5_162020AE7575"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -8.63,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AE786920_BDE2_FA06_41DB_EE77D9467794",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 7.64,
    "yawSpeed": 14.34,
    "targetYaw": 45.2,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "label": "Pasillo Habitaci\u00f3n S Piso 2",
 "id": "panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
 "thumbnailUrl": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -85.39,
   "distance": 1,
   "backwardYaw": -83.22,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "yaw": 87.47,
   "distance": 1,
   "backwardYaw": -127.24,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "yaw": -3.11,
   "distance": 1,
   "backwardYaw": -132.19,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A12EA653_B2FC_221E_41C2_244655C0F12F",
  "this.overlay_A6B164AD_B2FC_6605_41C7_EEEB1ADB06D2",
  "this.overlay_A7BA2C5E_B2FC_2607_41E1_FDAC1ECFC99D",
  "this.overlay_A6F966CC_B2FC_220B_41E4_05F197B134E0"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 161.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC16D79F_BDE2_F63A_41C9_0077C4628C79",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Zona Ropas",
 "id": "panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
 "thumbnailUrl": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 133.96,
   "distance": 1,
   "backwardYaw": 92.15,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6614936_B38C_2E07_41C3_7B6F000998E3"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -24.61,
  "pitch": -0.74,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 22.02,
  "pitch": 6.35,
  "class": "PanoramaCameraPosition"
 },
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 22.02,
  "stereographicFactor": 1,
  "pitch": -90,
  "class": "RotationalCameraDisplayPosition"
 },
 "id": "panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
 "displayMovements": [
  {
   "duration": 1000,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "duration": 3000,
   "targetPitch": 6.35,
   "targetStereographicFactor": 0,
   "easing": "cubic_in_out",
   "class": "TargetRotationalCameraDisplayMovement"
  }
 ],
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -136.07,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -12.41,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "label": "Ba\u00f1o Habitaci\u00f3n S Piso 2",
 "id": "panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
 "thumbnailUrl": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -132.19,
   "distance": 1,
   "backwardYaw": -3.11,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "yaw": 48.26,
   "distance": 1,
   "backwardYaw": -118.33,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A11965BD_B2FC_660A_41B5_37919A2C967C",
  "this.overlay_A6F696B6_B2FC_E206_41E4_B4B1380586BA"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -127.58,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AE6B7913_BDE2_FA0A_41E0_12C7E1F910D7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -167.95,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF1C789D_BDE2_FA3E_41E1_79F33E0B1B83",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Ba\u00f1o Social Piso 1",
 "id": "panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
 "thumbnailUrl": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 75.27,
   "distance": 1,
   "backwardYaw": 129.88,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 70.43,
   "distance": 1,
   "backwardYaw": 146.95,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6769466_B38C_6607_41B2_7DAC595DA138",
  "this.overlay_848EA393_B73F_6653_41C1_9494860D7408"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 72.18,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD28DABC_BDE2_FE7E_4183_27A94EC9EDAD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Terraza 2",
 "id": "panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
 "thumbnailUrl": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "yaw": -60.71,
   "distance": 1,
   "backwardYaw": -135.13,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "yaw": -0.85,
   "distance": 1,
   "backwardYaw": -143.79,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": 91.25,
   "distance": 1,
   "backwardYaw": 21.66,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6A05E9E_B294_2206_4198_456CF856B339",
  "this.overlay_A4C571CE_B294_7E07_41D1_47E11FFE9D44",
  "this.overlay_A10D4886_B294_6E07_41A8_FDEB9B15FA4E",
  "this.overlay_A4A048F5_B6CB_63D7_41E2_CADAF7431EB9"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 66.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B20269BC_BDE2_FA7D_41E4_25F1132707E5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -169.16,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B2383560_BDE2_CA06_41C9_7AE9C209A539",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 27.32,
    "yawSpeed": 53.89,
    "targetYaw": 45.2,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": -47.67,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B25A153B_BDE2_CA7A_41C7_53EB31DEEEAD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Sala 2",
 "id": "panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
 "thumbnailUrl": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 76.56,
   "distance": 1,
   "backwardYaw": -140.11,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3C66036_B594_EFA7_41A2_11A03EB23B88",
  "this.overlay_A3A4236E_B594_31A7_41E3_F3D7A5338CCC",
  "this.overlay_AC691B70_B594_11BB_41E0_91D054FDD64E",
  "this.overlay_F3F410E6_B755_63F5_41B3_43A112BBD5A7",
  "this.overlay_FFF6FB46_B74D_A634_41D1_3C89F5F80468"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Pasillo Habitaci\u00f3n P Piso 2",
 "id": "panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
 "thumbnailUrl": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -164.86,
   "distance": 1,
   "backwardYaw": 92.36,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "yaw": 93.27,
   "distance": 1,
   "backwardYaw": -108.93,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": 10.45,
   "distance": 1,
   "backwardYaw": -107.82,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A111A483_B293_E6FD_41E0_493A02B80FB7",
  "this.overlay_A6D36010_B294_FE1A_41C2_787255E488AB",
  "this.overlay_A17D4916_B295_EE07_41E1_73CF3F266C33"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 145.16,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADF22A13_BDE2_FE0A_41E1_B42BB3758F24",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 9.17,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD260AC9_BDE2_FE06_41BF_C3020E6DE923",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 105.21,
  "pitch": -0.61,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 124,
  "yaw": 124.06,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACD8C6C5_BDE2_F60E_41E5_CFC23C11536C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Entrada Piscina",
 "id": "panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
 "thumbnailUrl": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -170.83,
   "distance": 1,
   "backwardYaw": 42.93,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": -56.55,
   "distance": 1,
   "backwardYaw": -24.28,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A3469FE2_B68C_10DC_41DF_6B5634CED5FB",
  "this.overlay_A327DE79_B68C_33AD_4193_D0A50D92FF3D"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 114.81,
  "pitch": -5.87,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Pasillo 1 Piso 1",
 "id": "panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
 "thumbnailUrl": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -60.26,
   "distance": 1,
   "backwardYaw": 61.19,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 176.29,
   "distance": 1,
   "backwardYaw": 170.47,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": -150.57,
   "distance": 1,
   "backwardYaw": -126.7,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": 122.62,
   "distance": 1,
   "backwardYaw": 153.61,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": 20.09,
   "distance": 1,
   "backwardYaw": -158.98,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": -59.78,
   "distance": 1,
   "backwardYaw": 42.27,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
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
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 65.16,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFCF73D2_BDE2_CE0A_41E2_55BF4BD493DF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Piscina 3",
 "id": "panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
 "thumbnailUrl": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "yaw": -60.76,
   "distance": 1,
   "backwardYaw": -131.83,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "yaw": 108.05,
   "distance": 1,
   "backwardYaw": -52.95,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A32203F1_B69C_10BD_41E6_675DD40D1DD6",
  "this.overlay_ACAC7056_B69C_2FE7_41DB_2A052CC263A4"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Calle",
 "id": "panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
 "thumbnailUrl": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "yaw": -24.28,
   "distance": 1,
   "backwardYaw": -56.55,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -113.28,
   "distance": 1,
   "backwardYaw": -5.39,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "yaw": -116.43,
   "distance": 1,
   "backwardYaw": 18.72,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A355CF73_B574_11BD_41E0_5D4FB1E55AEB",
  "this.overlay_ACD895B7_B574_10A5_41C0_121645A3CBB6",
  "this.overlay_A3613C37_B574_37A5_41D8_B29C6D57DA6F"
 ],
 "partial": false
},
{
 "hfov": 360,
 "label": "Cocina 2",
 "id": "panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
 "thumbnailUrl": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": -64.58,
   "distance": 1,
   "backwardYaw": 108.85,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A623A739_B37C_620D_41BA_EC1F16031DAE"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 39.89,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF61F844_BDE2_FA0E_41D3_58F4AE91BD89",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -93.88,
  "pitch": 1.97,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 96.48,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF8DC405_BDE2_CA0E_41C8_F84932E9A41F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 45.2,
  "pitch": -4.99,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.34,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADD8A5C1_BDE2_CA06_41D5_BB922CD6C0F5",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 18.23,
    "yawSpeed": 35.63,
    "targetYaw": 9.54,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 7.92,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -145.96,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 106.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 24.81,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 156.53,
  "pitch": 3.87,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -95.69,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD9C6612_BDE2_F60A_41E6_BE426749CCB6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Habitacion P 2 Piso 2",
 "id": "panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
 "thumbnailUrl": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": -83.52,
   "distance": 1,
   "backwardYaw": 154.73,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6A7899D_B28C_2E05_41E4_2CD66509294C"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 46.49,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC241368_BDE2_CE06_41C5_84FD8CE78C96",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 3.55,
    "yawSpeed": 6.12,
    "targetYaw": 22.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 6.35,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -136.07,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -12.41,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -87.64,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AD733A97_BDE2_FE0A_41DE_504D24BBA915",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.32,
    "yawSpeed": 33.79,
    "targetYaw": 45.2,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -85.01,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 97.02,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -167.1,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -36.74,
  "pitch": -6.17,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -43.46,
  "pitch": 1.12,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -104.73,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC0B077A_BDE2_F6FA_41DE_F95DF6C3DC8B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": -46.04,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B242952F_BDE2_CA1A_41E0_E8E50E291BCF",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -62.18,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC547355_BDE2_CE0E_41BE_27D1BDC715D0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -175.47,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFE677B9_BDE2_F606_41E7_B4534FAC078F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 120.22,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADB655F6_BDE2_CA0A_41D8_C13220760FE3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -63.29,
  "pitch": 0.14,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -143.25,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF0FF88F_BDE2_FA1A_41C1_A18428A15B96",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 129.89,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ACA996D2_BDE2_F60A_41E3_1725BE3B595C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfov": 360,
 "label": "Habitacion P 4 Piso 2",
 "id": "panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
 "thumbnailUrl": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "yaw": 40.71,
   "distance": 1,
   "backwardYaw": 114.67,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A16BEE30_B28C_621A_41B4_A0885BB8C271",
  "this.overlay_ACA27E65_B6FC_DEF7_41E6_D85BF0C0F9B7"
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -71.15,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_ADD46A38_BDE2_FE06_41E3_7A18286032AC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -88.75,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AFE193B4_BDE2_CE0E_41CB_539DD426CE13",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 6.51,
    "yawSpeed": 12.07,
    "targetYaw": -177.35,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -177.35,
  "pitch": 12.53,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
 "initialSequence": {
  "movements": [
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": 81.64,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "yawSpeed": 33.25,
    "targetYaw": -0.72,
    "path": "shortest",
    "class": "TargetPanoramaCameraMovement",
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 155.72,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEBBA8EC_BDE2_FA1E_41C5_34CC27816539",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 59.59,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AEDD78D2_BDE2_FA0A_41E2_81F919880425",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 152.84,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC3A5767_BDE2_F60A_41CB_8A1DAEF3D374",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 119.74,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AF3F2884_BDE2_FA0E_41D0_47BF017F227B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 46.38,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B20C7574_BDE2_CA0E_41E0_B3F779FAEAA6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -57.38,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_B230B995_BDE2_FA0E_41E6_FD21D0638D87",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -58.3,
  "pitch": -3.88,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 127,
  "yaw": -1.77,
  "pitch": -2.99,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 130,
  "yaw": 93.81,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_AC4E872C_BDE2_F61E_41C9_30379EA89067",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 }
},
{
 "playbackBarHeadShadowVerticalLength": 0,
 "maxWidth": 1920,
 "playbackBarBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "right": 0,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "paddingLeft": 0,
 "playbackBarBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "minHeight": 480,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Georgia",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "minWidth": 854,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipFontColor": "#FFFFFF",
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "shadow": false,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "maxHeight": 1080,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingRight": 10,
 "playbackBarHeadShadowOpacity": 0.7,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "borderSize": 0,
 "toolTipPaddingTop": 20,
 "toolTipBorderSize": 1,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 10,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "progressBorderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "transitionMode": "fade_out_fade_in",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "bottom": "0%",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "paddingTop": 0,
 "playbackBarLeft": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "toolTipFontSize": "13px",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 10,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowColor": "#333333",
 "playbackBarHeight": 10,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Label_0C5F13A8_3BA0_A6FF_41BD_E3D21CFCE151",
  "this.Label_0C5F23A8_3BA0_A6FF_419F_468451E37918"
 ],
 "id": "Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
 "left": 30,
 "width": 271,
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": 20,
 "scrollBarOpacity": 0.5,
 "height": 97,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "--STICKER"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1"
 ],
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "height": 60,
 "backgroundColorRatios": [
  0,
  0.48,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#00CBDA",
  "#3538E8",
  "#B304E4"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "top": 0,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "horizontal",
 "paddingBottom": 0,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "--BUTTON SET"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A"
 ],
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "width": 60,
 "layout": "vertical",
 "borderSize": 0,
 "right": 15,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "verticalAlign": "middle",
 "height": 300,
 "paddingRight": 0,
 "backgroundColorRatios": [
  0.02
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "top": 62,
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "-button set"
 }
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
  "this.IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
  "this.IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
  "this.IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93"
 ],
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "width": "100%",
 "layout": "horizontal",
 "paddingRight": 30,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "height": 90,
 "gap": 3,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-button set container"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "---INFO photo"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "---PANORAMA LIST"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "---LOCATION"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "---FLOORPLAN"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "---PHOTOALBUM"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#04A3E1",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "bottom": "0%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "creationPolicy": "inAdvance",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "visible": false,
 "shadow": false,
 "contentOpaque": false,
 "data": {
  "name": "---REALTOR"
 }
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "shadowBlurRadius": 6,
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedRollOverIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed_rollover.png",
 "fontFamily": "Arial",
 "pressedIconHeight": 30,
 "width": 60,
 "shadowColor": "#000000",
 "borderSize": 0,
 "pressedIconWidth": 30,
 "paddingRight": 0,
 "iconHeight": 30,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "height": 60,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "gap": 5,
 "iconBeforeLabel": true,
 "layout": "horizontal",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "class": "Button",
 "iconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ]
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button Settings Mute"
 },
 "shadowBlurRadius": 6,
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedRollOverIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed_rollover.png",
 "fontFamily": "Arial",
 "pressedIconHeight": 30,
 "width": 60,
 "shadowColor": "#000000",
 "borderSize": 0,
 "pressedIconWidth": 30,
 "paddingRight": 0,
 "iconHeight": 30,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "height": 60,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "gap": 5,
 "iconBeforeLabel": true,
 "layout": "horizontal",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "class": "Button",
 "iconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_AD74563B_BDE2_F67B_41E5_AF1BA5C62A6F); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.77,
   "yaw": -90.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.77,
   "image": "this.AnimatedImageResource_AD11C2A3_BDE2_CE0A_41D1_51CC382AC951",
   "pitch": -22.85,
   "yaw": -90.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3E15370_B58C_11BC_41E6_4C27776DF80D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571, this.camera_AD40D647_BDE2_F60A_4172_97F2317923BC); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 12.02,
   "yaw": 18.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_1_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.02,
   "image": "this.AnimatedImageResource_AD1052A3_BDE2_CE0A_41D9_789992D071B2",
   "pitch": -22.04,
   "yaw": 18.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ACFC9CC8_B58C_10EB_41E2_29DDE0C71B35",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_B212A9E1_BDE2_FA06_41CB_89EBBDFF9DBC); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.48,
   "yaw": -135.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.48,
   "image": "this.AnimatedImageResource_AD21F283_BDE2_CE0A_41E6_71622AF69DA7",
   "pitch": -13.8,
   "yaw": -135.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A225C117_B29C_DE05_41E0_0C4CE54E91DE",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_B218F9C9_BDE2_FA06_41E3_00384EF1EE93); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 5.25,
   "yaw": -133.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.25,
   "image": "this.AnimatedImageResource_AD204284_BDE2_CE0E_41D2_40269B2C3056",
   "pitch": -7.95,
   "yaw": -133.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A63B2BE4_B6D5_A5F4_4193_343AED842967",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_AF703851_BDE2_FA06_41E3_86158817EA31); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 20.75,
   "yaw": -158.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.75,
   "image": "this.AnimatedImageResource_AD016298_BDE2_CE06_41DB_6C900462E8D2",
   "pitch": -42.71,
   "yaw": -158.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6DC1EB1_B374_221D_41DE_D83EFBFFB4E6",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4, this.camera_AF4EE85D_BDE2_FA3E_41E4_AA4178B60563); this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.74,
   "yaw": 108.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.74,
   "image": "this.AnimatedImageResource_AD01F298_BDE2_CE06_41E4_851B14B13AE7",
   "pitch": -36.21,
   "yaw": 108.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A7563243_B374_227D_41C1_948A1F8F4998",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_AF51586B_BDE2_FA1B_41D2_B3FDB92EB2A2); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.49,
   "yaw": -157.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.49,
   "image": "this.AnimatedImageResource_AD006299_BDE2_CE06_4171_75047919576B",
   "pitch": -27.46,
   "yaw": -157.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_8FA0D115_B74B_6254_41E5_98CB9C7406C4",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 6,
   "yaw": -160.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6,
   "image": "this.AnimatedImageResource_AD00C299_BDE2_CE06_41C3_30B43AB1590F",
   "pitch": 7.57,
   "yaw": -160.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3C42F48_B856_69D5_41DF_8253C2CD632F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9, this.camera_ADA1D5DB_BDE2_CA3A_41CD_6A5ABA852FDC); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.75,
   "yaw": -69.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.75,
   "image": "this.AnimatedImageResource_AD09A293_BDE2_CE0A_41D1_5C36A9544420",
   "pitch": -43.92,
   "yaw": -69.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A79FC131_B3BD_DE1D_41CB_6D0DB5D6FBA8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.3,
   "yaw": -78.74,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.96,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 378,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -78.74,
   "pitch": -8.96
  }
 ],
 "id": "overlay_A6640D08_B3BC_260B_41DC_5121CDCA6EA7",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_AD80EA68_BDE2_FE06_41E7_A6DEF3A1B617); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.46,
   "yaw": 20.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.46,
   "image": "this.AnimatedImageResource_AD253286_BDE2_CE0A_41D9_4FD6E794C0A7",
   "pitch": -16.12,
   "yaw": 20.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A1D575FB_B294_660D_41E6_37913D75622D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_AD6B3620_BDE2_F606_41E0_A154E5B817F4); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.67,
   "yaw": -150.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.06,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.67,
   "image": "this.AnimatedImageResource_AD1FA2A2_BDE2_CE0A_41DA_073B71E84565",
   "pitch": -20.06,
   "yaw": -150.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3B03E31_B594_13BD_41D3_974DC13A7193",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "maps": [
  {
   "hfov": 4.99,
   "yaw": -168.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_1_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.99,
   "image": "this.AnimatedImageResource_AD1E22A2_BDE2_CE0A_418C_79A7A6A15941",
   "pitch": -14.08,
   "yaw": -168.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A386E8BA_B594_70AC_41E4_A461BFCF4CD8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_AD67A62D_BDE2_F61E_41A2_B43E680D5C3D); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.15,
   "yaw": 18.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.15,
   "image": "this.AnimatedImageResource_AD1152A3_BDE2_CE0A_41B5_AD4CFABBC030",
   "pitch": -11.56,
   "yaw": 18.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A39912AD_B594_10A5_41DC_4C47E8D4EB26",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_AC7A4318_BDE2_CE06_41A1_C76D4322AC32); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 11.73,
   "yaw": -23.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 13.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.73,
   "image": "this.AnimatedImageResource_AD31A28F_BDE2_CE1A_41E7_49538DABB241",
   "pitch": 13.17,
   "yaw": -23.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6E6238D_B28C_220A_41E3_B57DEA725058",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_AC44D342_BDE2_CE0A_41D6_1A88FA43BA26); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 02b"
 },
 "maps": [
  {
   "hfov": 5.41,
   "yaw": 0.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_1_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.41,
   "image": "this.AnimatedImageResource_AD30028F_BDE2_CE1A_41D3_F0EBA04E6F89",
   "pitch": -43.75,
   "yaw": 0.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6CDE92C_B28C_2E0A_4194_F30F37CAF4C8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430, this.camera_ADE1C9FA_BDE2_FDFA_41DC_32DB763FA679); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 07b"
 },
 "maps": [
  {
   "hfov": 17.09,
   "yaw": -118.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_0_0_0_map.gif",
      "width": 36,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.09,
   "image": "this.AnimatedImageResource_AD31128D_BDE2_CE1E_41B2_38CDAA87A140",
   "pitch": -44.71,
   "yaw": -118.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6E80BC6_B2FC_6206_41D6_C9A2D50EB19B",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10,
   "yaw": -120.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_1_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 309,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -120.25,
   "pitch": -7.6
  }
 ],
 "id": "overlay_A900D003_B6F4_E233_41E0_F870378D67EA",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C, this.camera_AEDD78D2_BDE2_FA0A_41E2_81F919880425); this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 9.66,
   "yaw": 71.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.66,
   "image": "this.AnimatedImageResource_AD1572A5_BDE2_CE0E_41E5_03FB6ED51534",
   "pitch": -22.55,
   "yaw": 71.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_AEF6F510_B58C_117B_41D8_422DB0D5A80D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_AEFD48B8_BDE2_FA05_41CB_CD320CA5D45D); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10.41,
   "yaw": 36.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 350,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 36.75,
   "pitch": -2.86
  }
 ],
 "id": "overlay_AC6E0ACB_B58C_30EC_41E2_41132314EFCA",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273, this.camera_AECAE8C5_BDE2_FA0E_41CA_8858FB262BD3); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "maps": [
  {
   "hfov": 13.96,
   "yaw": -18.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_2_0_0_map.gif",
      "width": 41,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.96,
   "image": "this.AnimatedImageResource_AD12C2A6_BDE2_CE0A_41B3_70C7BCC951AF",
   "pitch": -21.7,
   "yaw": -18.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_AC95861D_B58C_1365_41E3_7692D9258B2E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_AFBDA3F8_BDE2_CE06_41E1_C34C7B12B174); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "maps": [
  {
   "hfov": 11.07,
   "yaw": -107.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_0_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.07,
   "image": "this.AnimatedImageResource_AD39B289_BDE2_CE06_41D1_57294DBB3961",
   "pitch": -44.63,
   "yaw": -107.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A157E29E_B294_2207_41DB_A8AFF0017D7B",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A, this.camera_AF8DC405_BDE2_CA0E_41C8_F84932E9A41F); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.86,
   "yaw": 154.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.86,
   "image": "this.AnimatedImageResource_AD386289_BDE2_CE06_41DA_5BBF33A51C4A",
   "pitch": -39.91,
   "yaw": 154.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A7E706F3_B294_621D_41E5_19D2605D803E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34, this.camera_AFAF13EB_BDE2_CE1A_41E5_2E2B89E0C9D2); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.21,
   "yaw": 73.73,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.21,
   "image": "this.AnimatedImageResource_AD38D28A_BDE2_CE1A_41C4_8427A791ABBC",
   "pitch": -38.63,
   "yaw": 73.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A7515888_B294_2E0B_41E6_514DE0AF929D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917, this.camera_AE9B7906_BDE2_FA0A_41E0_C0D0A19469FE); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 6.6,
   "yaw": -174.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_0_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.6,
   "image": "this.AnimatedImageResource_AD10E2A4_BDE2_CE0E_41E1_92E2BC7EEA15",
   "pitch": -20.21,
   "yaw": -174.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3BE4913_B58C_117D_41D2_272BE5657E02",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273, this.camera_AE8B58FA_BDE2_FBFA_41CA_CADA913D9C77); this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 5.64,
   "yaw": 4.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.64,
   "image": "this.AnimatedImageResource_AD1312A4_BDE2_CE0E_41E1_6705D6CE0BFB",
   "pitch": -18.68,
   "yaw": 4.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AC6CF670_B58C_13BB_41E5_7D3E6F2E0DCC",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A, this.camera_B24FB51F_BDE2_CA3A_41E5_1C06FF4F5B28); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 11.52,
   "yaw": 49.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 16.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.52,
   "image": "this.AnimatedImageResource_AD30E28F_BDE2_CE1A_41DB_A7CC68CB998B",
   "pitch": 16.21,
   "yaw": 49.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A684DD2A_B28C_260F_41D9_A1A49E440FE4",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F, this.camera_B242952F_BDE2_CA1A_41E0_E8E50E291BCF); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "maps": [
  {
   "hfov": 9.23,
   "yaw": 92.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_1_0_0_map.gif",
      "width": 24,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.23,
   "image": "this.AnimatedImageResource_AD33728F_BDE2_CE1A_41C9_0F370E6C4D86",
   "pitch": -40.01,
   "yaw": 92.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A6D0D2F2_B394_621F_41C1_6AE9CCDBB52A",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4, this.camera_B22CA555_BDE2_CA0F_41E7_16D9F468BF10); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 18.41,
   "yaw": 146.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 582,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 146.95,
   "pitch": -8.83
  }
 ],
 "id": "overlay_A710796D_B395_EE0A_41DA_0752F21353DE",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_B25A153B_BDE2_CA7A_41C7_53EB31DEEEAD); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.86,
   "yaw": -27.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_3_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.86,
   "image": "this.AnimatedImageResource_AD33A290_BDE2_CE06_41C1_B37CC0867E63",
   "pitch": -40.46,
   "yaw": -27.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A712B490_B394_E61B_41A2_38730A7C0792",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_B2498512_BDE2_CA0A_41E6_A9396A8E4A98); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.24,
   "yaw": -126.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_4_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.24,
   "image": "this.AnimatedImageResource_AD320290_BDE2_CE06_41D4_71E97C43F482",
   "pitch": -47.35,
   "yaw": -126.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A63E7C81_B3BC_66FA_41DD_AC4A0678A292",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 14.43,
   "yaw": -69.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_5_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.43,
   "image": "this.AnimatedImageResource_AD328290_BDE2_CE06_41D9_630C403BD6B8",
   "pitch": -30.88,
   "yaw": -69.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_90726D0E_B6DC_E235_41B5_EA8C6D07F42F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_B252D548_BDE2_CA06_41D5_E194B02ED482); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.58,
   "yaw": -124.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_6_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.58,
   "image": "this.AnimatedImageResource_AD35D291_BDE2_CE06_41E0_CD752E25D1E3",
   "pitch": -26.58,
   "yaw": -124.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_91AF2A5B_B6D5_E6D3_41E0_9AFC4D063CAF",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.77,
   "yaw": -172.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_7_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.18,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.77,
   "image": "this.AnimatedImageResource_AD35A291_BDE2_CE06_41CB_4D7202663A9E",
   "pitch": -24.18,
   "yaw": -172.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_915A78EA_B6D5_63FD_41C2_E6B76608423C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_AFE193B4_BDE2_CE0E_41CB_539DD426CE13); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.65,
   "yaw": 21.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.65,
   "image": "this.AnimatedImageResource_AD221285_BDE2_CE0E_418D_2673A3FB725F",
   "pitch": -16.58,
   "yaw": 21.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A1102A1B_B294_620E_41C6_0AFD68920E5F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708, this.camera_AC03738C_BDE2_CE1E_4180_60269C196152); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 23.79,
   "yaw": 101.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.79,
   "image": "this.AnimatedImageResource_AD22D286_BDE2_CE0A_4191_07AAF07B55D1",
   "pitch": -29.29,
   "yaw": 101.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6E69AE0_B294_223B_41E1_8EA28F4153E5",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E, this.camera_AC241368_BDE2_CE06_41C5_84FD8CE78C96); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 02c"
 },
 "maps": [
  {
   "hfov": 4.56,
   "yaw": 22.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.56,
   "image": "this.AnimatedImageResource_AD22B286_BDE2_CE0A_41C8_498AE8EA25DA",
   "pitch": -8.91,
   "yaw": 22.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A118C749_B294_620D_41D9_311280482196",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_AF599444_BDE2_CA0E_41E2_ED939413EAE1); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 14.16,
   "yaw": -131.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 22,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.25,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 738,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -131.83,
   "pitch": -29.25
  }
 ],
 "id": "overlay_A35C1888_B69C_3F6B_41DC_F150EEDBD9B3",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A, this.camera_AFD2D7F2_BDE2_F60A_41E7_1D32EBA2C547); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.65,
   "yaw": -67.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -46.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.65,
   "image": "this.AnimatedImageResource_AD396289_BDE2_CE06_41E1_F2086A1C1618",
   "pitch": -46.69,
   "yaw": -67.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A151E8BA_B294_EE0C_41D7_D78A106E34D6",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 11.04,
   "yaw": -73.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 391,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -73.07,
   "pitch": -5.05
  }
 ],
 "id": "overlay_A1330E00_B2F4_65FB_41DB_A2656859E799",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_AC547355_BDE2_CE0E_41BE_27D1BDC715D0); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.53,
   "yaw": -50.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.53,
   "image": "this.AnimatedImageResource_AD0A5295_BDE2_CE0E_415E_2D5BDDDBEF34",
   "pitch": -34.12,
   "yaw": -50.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A66E5240_B3B4_227A_41D4_EFF40490AE9A",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_B272E504_BDE2_CA0E_41C5_8FBEA6E60216); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.92,
   "yaw": -49.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.91,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.92,
   "image": "this.AnimatedImageResource_AD0A2295_BDE2_CE0E_41A5_134703E8586B",
   "pitch": -26.91,
   "yaw": -49.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A639D286_B38C_2207_41E0_B4CD2BCB7DDA",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 6.16,
   "yaw": -56.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_1_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.16,
   "image": "this.AnimatedImageResource_AD0A8295_BDE2_CE0E_41B5_4F90740A49B5",
   "pitch": -19.58,
   "yaw": -56.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_84CA4BFE_B73C_A5D5_41B3_056930E024CD",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_B219C57F_BDE2_CAFA_41D0_9C7958FC495A); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 12.83,
   "yaw": -127.24,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_0_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.83,
   "image": "this.AnimatedImageResource_AD31A28E_BDE2_CE1A_41E3_9FAC6A16E21A",
   "pitch": -39.43,
   "yaw": -127.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6F9F7B9_B2FC_220D_41E4_E34396F194F3",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E, this.camera_B2139589_BDE2_CA06_41E0_8415C275F09D); this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.93,
   "yaw": 52.42,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.93,
   "image": "this.AnimatedImageResource_AD30128E_BDE2_CE1A_41E1_6A64D3AB5A05",
   "pitch": -37.4,
   "yaw": 52.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6EB9B77_B2FC_2205_41E0_A090AA0C43CD",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_AF142481_BDE2_CA06_41D7_BC258767EDDA); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.18,
   "yaw": -83.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.18,
   "image": "this.AnimatedImageResource_AD27F287_BDE2_CE0A_41E3_F74EA0E34C83",
   "pitch": -30.73,
   "yaw": -83.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A11A94FB_B29C_E60D_41D0_8D8502D57E81",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28, this.camera_AF26B45E_BDE2_CA3A_41E2_30DC4EC98DA5); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 23.06,
   "yaw": 10.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 755,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 10.84,
   "pitch": -7.24
  }
 ],
 "id": "overlay_A1456C90_B29C_261B_41BD_F9A10C71356D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_AEE4748E_BDE2_CA1A_41CD_3EB5CA4152A0); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.68,
   "yaw": 92.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -43.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.68,
   "image": "this.AnimatedImageResource_AD261287_BDE2_CE0A_41D1_AE5E3051BDA8",
   "pitch": -43.77,
   "yaw": 92.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A11564EB_B29C_260D_41D5_6A4CE8C0A213",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943, this.camera_AF369469_BDE2_CA06_41CE_D6CC47CCFD24); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 19.74,
   "yaw": 171.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 20.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.74,
   "image": "this.AnimatedImageResource_AD26C287_BDE2_CE0A_41E0_9F88616932B6",
   "pitch": 20.1,
   "yaw": 171.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A2A67653_B6CF_AED3_41E6_804ACA3BFEA0",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A, this.camera_AEF2849D_BDE2_CA3E_41E6_CFCCD3960EED); this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 14.69,
   "yaw": -165.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.69,
   "image": "this.AnimatedImageResource_AD268287_BDE2_CE0A_41E2_BC3256944030",
   "pitch": -32.61,
   "yaw": -165.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3E7C0A3_B6CC_A273_41D1_B060EF130F1E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62, this.camera_ADCE7A1F_BDE2_FE3A_41CD_0D9DBC4AC119); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.13,
   "yaw": -34.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.13,
   "image": "this.AnimatedImageResource_AD3D828B_BDE2_CE1A_41D5_57FF3050E050",
   "pitch": -36.03,
   "yaw": -34.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6F613F2_B2F4_221F_41C4_11EC6A5D6BC3",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28, this.camera_ADD80A2B_BDE2_FE1A_41E0_2BD6224BA7D6); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.57,
   "yaw": -133.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.57,
   "image": "this.AnimatedImageResource_AD3C728C_BDE2_CE1E_41B5_919F2A837FFB",
   "pitch": -34.32,
   "yaw": -133.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A66E538A_B2F4_E20F_41BD_C6E949D03F29",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7, this.camera_ADF22A13_BDE2_FE0A_41E1_B42BB3758F24); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.81,
   "yaw": -164.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -38.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.81,
   "image": "this.AnimatedImageResource_AD3C228C_BDE2_CE1E_41DB_30E364C44D88",
   "pitch": -38.63,
   "yaw": -164.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6C644CF_B2F5_E605_41C2_03F4FA4A3D05",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.99,
   "yaw": -136.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 22,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 370,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -136.91,
   "pitch": -3.3
  }
 ],
 "id": "overlay_A11C2CBC_B2F4_660B_41C3_9754038D0D88",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_ADB655F6_BDE2_CA0A_41D8_C13220760FE3); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.16,
   "yaw": 42.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.16,
   "image": "this.AnimatedImageResource_AD03D299_BDE2_CE06_41CD_1EAC745445DA",
   "pitch": -25.05,
   "yaw": 42.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A581B76C_B294_220B_41E2_C3CF23E91DAD",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left"
 },
 "maps": [
  {
   "hfov": 6.6,
   "yaw": 25.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_1_0_0_map.gif",
      "width": 51,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.6,
   "image": "this.AnimatedImageResource_AD02529A_BDE2_CE3A_41BD_24A94CA808D2",
   "pitch": -24.6,
   "yaw": 25.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A581EE63_B294_223E_41B8_ACDF70FE7F79",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 4.34,
   "yaw": 41.35,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_2_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.38,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.34,
   "image": "this.AnimatedImageResource_AD02329A_BDE2_CE3A_41C6_87621635BCBC",
   "pitch": -13.38,
   "yaw": 41.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A5FBFFD5_B294_2205_41D6_BBFDC66D6532",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_AD805604_BDE2_F60E_41DA_421DA8B8AB3F); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 6.74,
   "yaw": 59.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_3_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_AD02B29A_BDE2_CE3A_41DE_26BC7B7A97CC",
   "pitch": -16.58,
   "yaw": 59.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A60710B8_B293_DE0B_41D7_6A53A84E287E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_ADBBA5E9_BDE2_CA06_41DB_926B36DDE642); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.44,
   "yaw": -143.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_4_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.44,
   "image": "this.AnimatedImageResource_AD05029B_BDE2_CE3A_41E1_14155B6B37D7",
   "pitch": -27.84,
   "yaw": -143.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A591AD1C_B29C_260B_41E5_1609317911D1",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_AD9C6612_BDE2_F60A_41E6_BE426749CCB6); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.49,
   "yaw": 167.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_5_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.49,
   "image": "this.AnimatedImageResource_AD05829B_BDE2_CE3A_4179_1DA156A3C418",
   "pitch": -31.16,
   "yaw": 167.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3CE488B_B594_1F6D_41E2_DAF2A43D9141",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571, this.camera_AFE677B9_BDE2_F606_41E7_B4534FAC078F); this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 8.71,
   "yaw": 52.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_0_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.71,
   "image": "this.AnimatedImageResource_AD1392A4_BDE2_CE0E_41CA_CDDFDB858541",
   "pitch": -24.07,
   "yaw": 52.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ACAA9B16_B58C_3164_41D1_D1A4B60E77C1",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_AC16D79F_BDE2_F63A_41C9_0077C4628C79); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.71,
   "yaw": 179.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.71,
   "image": "this.AnimatedImageResource_AD1272A5_BDE2_CE0E_41E1_845200C9D85A",
   "pitch": -34.75,
   "yaw": 179.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3AFA20C_B58C_136B_41DF_2BF4D20F8B28",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 5.81,
   "yaw": 136.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_2_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.81,
   "image": "this.AnimatedImageResource_AD1292A5_BDE2_CE0E_41B7_E241275F14B6",
   "pitch": -19.03,
   "yaw": 136.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_F9256439_B777_625C_41E6_18134498E027",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_AC3A5767_BDE2_F60A_41CB_8A1DAEF3D374); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.3,
   "yaw": 132.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -50.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.3,
   "image": "this.AnimatedImageResource_AD343291_BDE2_CE06_41CE_1369FB100E75",
   "pitch": -50.54,
   "yaw": 132.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6539B97_B3BC_2206_41A5_D82F19533741",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9, this.camera_AC4E872C_BDE2_F61E_41C9_30379EA89067); this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.77,
   "yaw": 25.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.77,
   "image": "this.AnimatedImageResource_AD34A292_BDE2_CE0A_41AA_DFBEFD5AF622",
   "pitch": -49.1,
   "yaw": 25.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A638CFC8_B3BC_E20B_41E4_7C1C4EF0DD77",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_AC5CD739_BDE2_F606_41C9_66106349705D); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 15.78,
   "yaw": -55.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_2_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.78,
   "image": "this.AnimatedImageResource_AD373292_BDE2_CE0A_41CB_55C0BEAC9096",
   "pitch": -48.51,
   "yaw": -55.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A789B760_B3BC_223B_41E4_5B607861AFEF",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4, this.camera_AC0B077A_BDE2_F6FA_41DE_F95DF6C3DC8B); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 9.14,
   "yaw": 129.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.14,
   "image": "this.AnimatedImageResource_AD378292_BDE2_CE0A_41E2_3A1C85C23AC5",
   "pitch": -8.84,
   "yaw": 129.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9ED4A39C_B6D4_E655_41DB_8A29F7AA08A5",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_AC2C5750_BDE2_F606_41E4_F6A4A6BE0BE6); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.65,
   "yaw": 170.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_4_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.65,
   "image": "this.AnimatedImageResource_AD366292_BDE2_CE0A_41B4_3FACCCA447F5",
   "pitch": -31.78,
   "yaw": 170.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9CDEF6CD_B6CB_AE34_41DA_8C081869FC02",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_AC18B78E_BDE2_F61A_41D8_5030A1F55371); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.28,
   "yaw": 155.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_5_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.28,
   "image": "this.AnimatedImageResource_AD36E293_BDE2_CE0A_41E4_2A59C2C69E8D",
   "pitch": -18.87,
   "yaw": 155.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_9E8069F2_B6CC_A5ED_41E4_CB4B70F88FB0",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39, this.camera_AE6B7913_BDE2_FA0A_41E0_12C7E1F910D7); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.67,
   "yaw": -98.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.67,
   "image": "this.AnimatedImageResource_AD30828E_BDE2_CE1A_41DF_1D1594E442C4",
   "pitch": -39.6,
   "yaw": -98.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A69FC48F_B2F4_2605_41B7_882B095D5499",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 6.71,
   "yaw": -106.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_1_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.71,
   "image": "this.AnimatedImageResource_AD33628E_BDE2_CE1A_41D5_0709E71A376D",
   "pitch": -24.13,
   "yaw": -106.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6C350C4_B2F4_7E7B_41D9_ED8FC1575B96",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_B27174F6_BDE2_CA0A_41E4_115C1E8F7FF5); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 21.69,
   "yaw": -108.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 713,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -108.93,
   "pitch": -6.52
  }
 ],
 "id": "overlay_A6E4DD05_B294_6605_41E2_C92C885527A9",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28, this.camera_AEC2B4AA_BDE2_CA1B_41E2_1C684E2267AE); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.77,
   "yaw": 78.9,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.77,
   "image": "this.AnimatedImageResource_AD26A288_BDE2_CE06_41CD_B7275D98BEEB",
   "pitch": -49.09,
   "yaw": 78.9,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A63AE262_B294_223F_41E4_134E4A27BD52",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_AFCF73D2_BDE2_CE0A_41E2_55BF4BD493DF); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.61,
   "yaw": -147.51,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.61,
   "image": "this.AnimatedImageResource_ACE912A9_BDE2_CE06_41C3_246836C215B4",
   "pitch": -12.31,
   "yaw": -147.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A35DDE43_B694_13DD_41DA_B50490B813A5",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_AFDF13DE_BDE2_CE3A_41E3_487344CA7D49); this.mainPlayList.set('selectedIndex', 50)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 05"
 },
 "maps": [
  {
   "hfov": 7.16,
   "yaw": -52.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_1_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_ACE992AA_BDE2_CE1A_41D0_731A362F58D7",
   "pitch": -4.16,
   "yaw": -52.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A34A230D_B69C_1164_41D2_523E9713FC6C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4, this.camera_AF2EB877_BDE2_FA0A_41DA_3995B07B9A29); this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 20.02,
   "yaw": -27.97,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.02,
   "image": "this.AnimatedImageResource_AD04029B_BDE2_CE3A_41DF_77B425D6B3F0",
   "pitch": -32.86,
   "yaw": -27.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3F57B2F_B58C_31A5_41B1_C3B0D323E499",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_AEEC28AB_BDE2_FA1A_41E3_B8F960428EBC); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.17,
   "yaw": 61.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.17,
   "image": "this.AnimatedImageResource_AD07529B_BDE2_CE3A_41C8_AD0D6DD26DFA",
   "pitch": -27.68,
   "yaw": 61.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3ACC614_B58C_137B_41E1_232DBC95532F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_AF3F2884_BDE2_FA0E_41D0_47BF017F227B); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 6.55,
   "yaw": 61.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.55,
   "image": "this.AnimatedImageResource_AD07229C_BDE2_CE3E_41D3_E10116C753E2",
   "pitch": -15.21,
   "yaw": 61.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AC5CAF7E_B58C_11A7_41D5_27EB46ACF8EF",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left"
 },
 "maps": [
  {
   "hfov": 4.7,
   "yaw": 55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_3_0_0_map.gif",
      "width": 51,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.7,
   "image": "this.AnimatedImageResource_AD07A29C_BDE2_CE3E_41D3_F13723D5AB5D",
   "pitch": -13.69,
   "yaw": 55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A3FB9C62_B58C_17DF_41B2_2D2AE041D46F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 2.98,
   "yaw": 62.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_4_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.98,
   "image": "this.AnimatedImageResource_AD06229C_BDE2_CE3E_41D5_4D0FB60847B4",
   "pitch": -9.78,
   "yaw": 62.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3DD8EFE_B58C_70A7_41B4_362FA234601A",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_AF1C789D_BDE2_FA3E_41E1_79F33E0B1B83); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.09,
   "yaw": 123.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_5_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.09,
   "image": "this.AnimatedImageResource_AD06B29D_BDE2_CE3E_41DD_52E11F43EA30",
   "pitch": -32.12,
   "yaw": 123.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3D22D14_B594_117B_41E6_760EE19E43F8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_AF0FF88F_BDE2_FA1A_41C1_A18428A15B96); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 13.06,
   "yaw": -81.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_6_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 476,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -81.16,
   "pitch": -5.69
  }
 ],
 "id": "overlay_8B6BE10B_B75C_E233_41D1_BA093F4471F8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_AF932837_BDE2_FA0A_41CB_3573A121DAF2); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.56,
   "yaw": -95.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.56,
   "image": "this.AnimatedImageResource_AD3B128A_BDE2_CE1A_41D0_2F6A86F5CE15",
   "pitch": -41.27,
   "yaw": -95.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A15EDDED_B28F_E605_41E3_95E1B137D21C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B, this.camera_AF837829_BDE2_FA06_41D6_EFB184C3F384); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.41,
   "yaw": 114.67,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.28,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.41,
   "image": "this.AnimatedImageResource_AD3BF28A_BDE2_CE1A_41E4_CDC79572FAD6",
   "pitch": -33.28,
   "yaw": 114.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6361CB7_B28C_2605_41D8_2365410F49EF",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_ACCBB6B9_BDE2_F606_41E2_0BE0BA7DF293); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.76,
   "yaw": 84.31,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.76,
   "image": "this.AnimatedImageResource_AD19629E_BDE2_CE3A_41E2_226357DF9B0A",
   "pitch": -27.97,
   "yaw": 84.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3E111D5_B594_10E5_41C5_6E273440BC6E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_ACE1469E_BDE2_F63A_41D8_4C9747AC2EA0); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.97,
   "yaw": 12.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.97,
   "image": "this.AnimatedImageResource_AD19C29E_BDE2_CE3A_41DC_A2B1E6D03A64",
   "pitch": -26.32,
   "yaw": 12.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3427BAC_B594_F0AB_41E3_584E8B987CCD",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E, this.camera_ACFF16AA_BDE2_F61A_41DA_A70049193BE7); this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 15.3,
   "yaw": -140.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.3,
   "image": "this.AnimatedImageResource_AD18429F_BDE2_CE3A_41D8_968D9EC86F2B",
   "pitch": -18.23,
   "yaw": -140.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3FBFB39_B594_11AD_41D3_81E8CDCC1CFB",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 8.49,
   "yaw": 9.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 273,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 9.34,
   "pitch": -4.78
  }
 ],
 "id": "overlay_F45FECC5_B754_A237_41E4_F91A927F2A47",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 9.21,
   "yaw": 100.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_4_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.21,
   "image": "this.AnimatedImageResource_AD18A29F_BDE2_CE3A_41E3_7F0C90A0F47B",
   "pitch": -23.27,
   "yaw": 100.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FE64F1A8_B757_627D_41E3_AD93A9EDCAFA",
 "rollOverDisplay": false
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "shadowBlurRadius": 6,
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedRollOverIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed_rollover.png",
 "fontFamily": "Arial",
 "layout": "horizontal",
 "width": 60,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 30,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "height": 60,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "push",
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "gap": 5,
 "iconBeforeLabel": true,
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "class": "Button",
 "iconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "data": {
  "name": "Button settings VR"
 }
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button Settings HS"
 },
 "rollOverIconHeight": 30,
 "shadowBlurRadius": 6,
 "id": "Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedRollOverIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed_rollover.png",
 "fontFamily": "Arial",
 "pressedIconHeight": 30,
 "width": 60,
 "shadowColor": "#000000",
 "borderSize": 0,
 "pressedIconWidth": 30,
 "paddingRight": 0,
 "iconHeight": 30,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "height": 60,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "rollOverIconWidth": 30,
 "pressedIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed.png",
 "gap": 5,
 "iconBeforeLabel": true,
 "layout": "horizontal",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "iconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA.png",
 "class": "Button",
 "iconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ]
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button Settings Gyro"
 },
 "rollOverIconHeight": 30,
 "shadowBlurRadius": 6,
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedRollOverIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed_rollover.png",
 "fontFamily": "Arial",
 "pressedIconHeight": 30,
 "width": 60,
 "shadowColor": "#000000",
 "borderSize": 0,
 "pressedIconWidth": 30,
 "paddingRight": 0,
 "iconHeight": 30,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "height": 60,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "mode": "toggle",
 "rollOverIconWidth": 30,
 "gap": 5,
 "iconBeforeLabel": true,
 "layout": "horizontal",
 "fontSize": 12,
 "paddingTop": 0,
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "fontStyle": "normal",
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "class": "Button",
 "iconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_B230B995_BDE2_FA0E_41E6_FD21D0638D87); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "hfov": 11.36,
   "yaw": 153.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.36,
   "image": "this.AnimatedImageResource_AD1D82A1_BDE2_CE06_41C7_4A50B9BECD4A",
   "pitch": -29.93,
   "yaw": 153.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A3459C80_B594_175B_41B0_B5016DEACF26",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C, this.camera_B20949A2_BDE2_FA0A_41DD_5856B51968F2); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.81,
   "yaw": -5.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.81,
   "image": "this.AnimatedImageResource_AD1C02A1_BDE2_CE06_41E1_41CA0867DE01",
   "pitch": -20.71,
   "yaw": -5.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3EC57E4_B594_10DB_41E4_457C674F15AD",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_B20269BC_BDE2_FA7D_41E4_25F1132707E5); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 6.76,
   "yaw": -5.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.76,
   "image": "this.AnimatedImageResource_AD1C82A2_BDE2_CE0A_41C8_8E4D64B230C0",
   "pitch": -6.59,
   "yaw": -5.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A84D05ED_B594_10A4_41A9_DBA42200C405",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917, this.camera_B20DB9AF_BDE2_FA1A_41B5_4CA3AA51DA3A); this.mainPlayList.set('selectedIndex', 41)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 24.19,
   "yaw": -104.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.19,
   "image": "this.AnimatedImageResource_AD1FD2A2_BDE2_CE0A_41E1_8C5ACD99881C",
   "pitch": -8.73,
   "yaw": -104.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3985956_B594_11E7_41D6_B17047DD216F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C, this.camera_AD260AC9_BDE2_FE06_41BF_C3020E6DE923); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 8.05,
   "yaw": 42.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.31,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 297,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 42.93,
   "pitch": -9.31
  }
 ],
 "id": "overlay_AC08694A_B68C_31EF_41AF_C3038D9E6E8C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63, this.camera_AD32EAD5_BDE2_FE0E_41E6_9F162D22E8B8); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.08,
   "yaw": -114.84,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.08,
   "image": "this.AnimatedImageResource_AD16E2A9_BDE2_CE06_41E5_F63C8959731C",
   "pitch": -10.94,
   "yaw": -114.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A34189AB_B68C_10AD_41CD_E111D2202B16",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A, this.camera_ADB4CA5C_BDE2_FE3D_41CB_B9C006A6E5B0); this.mainPlayList.set('selectedIndex', 25)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.96,
   "yaw": 100.94,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.96,
   "image": "this.AnimatedImageResource_AD096293_BDE2_CE0A_41E1_4AF8D44D4065",
   "pitch": -49.77,
   "yaw": 100.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A677D88F_B3BC_2E05_41D7_EFC39973BFD7",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_ADBA6A4F_BDE2_FE1A_41D3_F2F1E7B70B19); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.46,
   "yaw": -86.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.46,
   "image": "this.AnimatedImageResource_AD09C293_BDE2_CE0A_41D1_5510D52987C5",
   "pitch": -48.33,
   "yaw": -86.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A66464B6_B3BC_E606_41CA_DE4D2DC1AF23",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_AD69DA7E_BDE2_FEFA_41DA_13B3F3663F18); this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 16.58,
   "yaw": -120.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.58,
   "image": "this.AnimatedImageResource_AD1572A6_BDE2_CE0A_41BC_800B0C6EEC1C",
   "pitch": -42.15,
   "yaw": -120.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_ACE3D251_B574_13FD_41C9_3ED1B5AFE731",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_B239D97D_BDE2_FAFE_41D2_9829442AD6DB); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 13.99,
   "yaw": -143.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 15.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 471,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -143.79,
   "pitch": 15.34
  }
 ],
 "id": "overlay_A116EB46_B29C_6207_41E0_442B55E89DA4",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_AE786920_BDE2_FA06_41DB_EE77D9467794); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03a"
 },
 "maps": [
  {
   "hfov": 8.11,
   "yaw": -113.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.92,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.11,
   "image": "this.AnimatedImageResource_AD244286_BDE2_CE0A_41D4_8D9E8B17C242",
   "pitch": -49.92,
   "yaw": -113.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6EC268E_B29C_2207_41DB_EF3BE4C5AF26",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_B2383560_BDE2_CA06_41C9_7AE9C209A539); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 23.67,
   "yaw": 59.91,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 19,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 967,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 59.91,
   "pitch": -15.17
  }
 ],
 "id": "overlay_A15A77A4_B28C_223B_41D4_961EBEF9520D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7, this.camera_B20C7574_BDE2_CA0E_41E0_B3F779FAEAA6); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.07,
   "yaw": -26.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.07,
   "image": "this.AnimatedImageResource_AD3D528B_BDE2_CE1A_419A_FB4219266FAF",
   "pitch": -32.26,
   "yaw": -26.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A1426398_B28C_220B_41CF_5CB6C0F48471",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.43,
   "yaw": -66.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.43,
   "image": "this.AnimatedImageResource_AD3D228B_BDE2_CE1A_41CA_A52BAEF71DB4",
   "pitch": -23.48,
   "yaw": -66.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A1539037_B2F3_FE05_41D2_2E8B1531C992",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_AD653A8A_BDE2_FE1A_4197_6FAE590E7352); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.56,
   "yaw": -149.79,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.56,
   "image": "this.AnimatedImageResource_AD06129D_BDE2_CE3E_41D4_39F74D680D6B",
   "pitch": -35.22,
   "yaw": -149.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3CA1829_B58C_1FAC_41D2_7D150963EF5A",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.37,
   "yaw": -134.38,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 305,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -134.38,
   "pitch": -5.84
  }
 ],
 "id": "overlay_F74E4707_B75C_AE33_41CC_032D81451266",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_ACD8C6C5_BDE2_F60E_41E5_CFC23C11536C); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "maps": [
  {
   "hfov": 15.9,
   "yaw": -147.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_0_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.2,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.9,
   "image": "this.AnimatedImageResource_AD08E294_BDE2_CE0E_41E3_2B07D3592015",
   "pitch": -41.2,
   "yaw": -147.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A66A75AE_B3BC_2607_41E0_99495DC1CE0C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40, this.camera_ACA996D2_BDE2_F60A_41E3_1725BE3B595C); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 23.97,
   "yaw": 117.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.43,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23.97,
   "image": "this.AnimatedImageResource_AD0B5294_BDE2_CE0E_41D5_D3C1F1928094",
   "pitch": -47.43,
   "yaw": 117.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A66EEB8F_B3B4_2206_41D9_B472B986BFC2",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758, this.camera_ACA726DE_BDE2_F63A_41C1_E41EB41514E9); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.96,
   "yaw": 31.2,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_2_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.96,
   "image": "this.AnimatedImageResource_AD0BC294_BDE2_CE0E_41CD_5776A9DDE25E",
   "pitch": -40.77,
   "yaw": 31.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A65E32F1_B3B4_E21A_41E5_162020AE7575",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_AF9AF412_BDE2_CA0A_41A6_425EC9D855AC); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.71,
   "yaw": -85.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -35.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.71,
   "image": "this.AnimatedImageResource_AD3F728C_BDE2_CE1E_418C_A44DB0980762",
   "pitch": -35.69,
   "yaw": -85.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A12EA653_B2FC_221E_41C2_244655C0F12F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 8.87,
   "yaw": -85.5,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_1_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.87,
   "image": "this.AnimatedImageResource_AD3F228C_BDE2_CE1E_41DE_B48C7EDB2C96",
   "pitch": -20.61,
   "yaw": -85.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6B164AD_B2FC_6605_41C7_EEEB1ADB06D2",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430, this.camera_AF499438_BDE2_CA06_41D3_3628D01080E4); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.72,
   "yaw": -3.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.72,
   "image": "this.AnimatedImageResource_AD3F828D_BDE2_CE1E_41D2_BA98984565F9",
   "pitch": -48.19,
   "yaw": -3.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A7BA2C5E_B2FC_2607_41E1_FDAC1ECFC99D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39, this.camera_AF7B142B_BDE2_CA1A_41C4_AB47234F0D77); this.mainPlayList.set('selectedIndex', 19)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 13.94,
   "yaw": 87.47,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_3_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -58.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.94,
   "image": "this.AnimatedImageResource_AD3E128D_BDE2_CE1E_41E6_F2AC9F0BF237",
   "pitch": -58.93,
   "yaw": 87.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6F966CC_B2FC_220B_41E4_05F197B134E0",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_ADAE2A43_BDE2_FE0A_41D9_DAA11954927B); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Left"
 },
 "maps": [
  {
   "hfov": 17.45,
   "yaw": 133.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_1_HS_0_0_0_map.gif",
      "width": 51,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.45,
   "image": "this.AnimatedImageResource_AD0AC295_BDE2_CE0E_41E6_12940E1B0762",
   "pitch": -49.77,
   "yaw": 133.96,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A6614936_B38C_2E07_41C3_7B6F000998E3",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_AC638711_BDE2_F606_41D5_C9904896845A); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 27.17,
   "yaw": -132.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 876,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -132.19,
   "pitch": -10
  }
 ],
 "id": "overlay_A11965BD_B2FC_660A_41B5_37919A2C967C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED, this.camera_AC71D71F_BDE2_F63A_41E0_F06E7A82C6D3); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 07b"
 },
 "maps": [
  {
   "hfov": 16.87,
   "yaw": 48.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_1_0_0_map.gif",
      "width": 36,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.87,
   "image": "this.AnimatedImageResource_AD3E828D_BDE2_CE1E_41C8_C4FF95DC4162",
   "pitch": -47.16,
   "yaw": 48.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6F696B6_B2FC_E206_41E4_B4B1380586BA",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_AFB2B81C_BDE2_FA3F_41E2_A469AB3817BC); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.89,
   "yaw": 70.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -36.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.89,
   "image": "this.AnimatedImageResource_AD0B8295_BDE2_CE0E_41E5_DA516ADA771E",
   "pitch": -36.01,
   "yaw": 70.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6769466_B38C_6607_41B2_7DAC595DA138",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_AFA2B805_BDE2_FA0E_41E6_CCACD04FE6C3); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 6.1,
   "yaw": 75.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_1_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.1,
   "image": "this.AnimatedImageResource_AD0A1295_BDE2_CE0E_41D3_F631569555A3",
   "pitch": -24.13,
   "yaw": 75.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_848EA393_B73F_6653_41C1_9494860D7408",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E, this.camera_ADEFD594_BDE2_CA0E_41E1_6B8E4E1CF08A); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.68,
   "yaw": -60.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.68,
   "image": "this.AnimatedImageResource_AD208285_BDE2_CE0E_41CF_42EF013EA29E",
   "pitch": -11.48,
   "yaw": -60.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6A05E9E_B294_2206_4198_456CF856B339",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_ADD8A5C1_BDE2_CA06_41D5_BB922CD6C0F5); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.08,
   "yaw": 91.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.08,
   "image": "this.AnimatedImageResource_AD235285_BDE2_CE0E_41E2_C02ADE1003FA",
   "pitch": -20.4,
   "yaw": 91.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A4C571CE_B294_7E07_41D1_47E11FFE9D44",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.48,
   "yaw": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.48,
   "image": "this.AnimatedImageResource_AD231285_BDE2_CE0E_41E2_BD1ABD23DDD7",
   "pitch": -15.86,
   "yaw": 50,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A10D4886_B294_6E07_41A8_FDEB9B15FA4E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943, this.camera_ADF585A8_BDE2_CA06_41E2_EB08E2600D40); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.7,
   "yaw": -0.85,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_3_0_0_map.gif",
      "width": 15,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 327,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -0.85,
   "pitch": -6.33
  }
 ],
 "id": "overlay_A4A048F5_B6CB_63D7_41E2_CADAF7431EB9",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_AF61F844_BDE2_FA0E_41D3_58F4AE91BD89); this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.07,
   "yaw": 76.56,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.07,
   "image": "this.AnimatedImageResource_AD1B329F_BDE2_CE3A_41DC_A35F0A822B23",
   "pitch": -37.83,
   "yaw": 76.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3C66036_B594_EFA7_41A2_11A03EB23B88",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.14,
   "yaw": 56.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.14,
   "image": "this.AnimatedImageResource_AD1BA2A0_BDE2_CE06_41E3_3FB79B8F5367",
   "pitch": -19.08,
   "yaw": 56.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3A4236E_B594_31A7_41E3_F3D7A5338CCC",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.37,
   "yaw": 103.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.37,
   "image": "this.AnimatedImageResource_AD1A32A0_BDE2_CE06_41D9_F1F8A9C1B001",
   "pitch": -19.99,
   "yaw": 103.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AC691B70_B594_11BB_41E0_91D054FDD64E",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 4.56,
   "yaw": 53.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 53.98,
   "pitch": -2.88
  }
 ],
 "id": "overlay_F3F410E6_B755_63F5_41B3_43A112BBD5A7",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "yaw": 112.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_4_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.89,
   "image": "this.AnimatedImageResource_AD1D32A1_BDE2_CE06_41E1_4DD344BC13D8",
   "pitch": -17.72,
   "yaw": 112.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_FFF6FB46_B74D_A634_41D1_3C89F5F80468",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A, this.camera_AD5AFAB1_BDE2_FE06_41DD_9DFF55A31DAC); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 29.74,
   "yaw": 93.27,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.03,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 1072,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 93.27,
   "pitch": -4.03
  }
 ],
 "id": "overlay_A111A483_B293_E6FD_41E0_493A02B80FB7",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_AD733A97_BDE2_FE0A_41DE_504D24BBA915); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.13,
   "yaw": -164.86,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.13,
   "image": "this.AnimatedImageResource_AD39D288_BDE2_CE06_41D6_41D2A103463B",
   "pitch": -44.48,
   "yaw": -164.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6D36010_B294_FE1A_41C2_787255E488AB",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_AD28DABC_BDE2_FE7E_4183_27A94EC9EDAD); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 14.89,
   "yaw": 10.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_2_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.89,
   "image": "this.AnimatedImageResource_AD263288_BDE2_CE06_4186_C56DC784AAB2",
   "pitch": -41.98,
   "yaw": 10.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A17D4916_B295_EE07_41E1_73CF3F266C33",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_AEBBA8EC_BDE2_FA1E_41C5_34CC27816539); this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.11,
   "yaw": -56.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.11,
   "image": "this.AnimatedImageResource_AD1762A8_BDE2_CE06_41E6_07CEA8951F4F",
   "pitch": -6.57,
   "yaw": -56.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3469FE2_B68C_10DC_41DF_6B5634CED5FB",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_AEAB88E0_BDE2_FA06_41C3_A58DF549A539); this.mainPlayList.set('selectedIndex', 48)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 6.06,
   "yaw": -170.83,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 18,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.42,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 229,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -170.83,
   "pitch": -9.42
  }
 ],
 "id": "overlay_A327DE79_B68C_33AD_4193_D0A50D92FF3D",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Right"
 },
 "maps": [
  {
   "hfov": 12.26,
   "yaw": -139.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_0_0_0_map.gif",
      "width": 51,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.26,
   "image": "this.AnimatedImageResource_AD0D7296_BDE2_CE0A_4184_FC5B749293A2",
   "pitch": -26.49,
   "yaw": -139.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A603DF5C_B38C_620B_41E3_C7BBF4996339",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.82,
   "yaw": -113.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.19,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
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
      "height": 328,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -113.19,
   "pitch": -8.19
  }
 ],
 "id": "overlay_A678B64E_B38C_2207_41AF_1CA339D506C2",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_AD05E686_BDE2_F60A_41E2_FEB0FBFFD40E); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.31,
   "yaw": 20.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -41.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.31,
   "image": "this.AnimatedImageResource_AD0C4296_BDE2_CE0A_41D5_AB63CFD01ABC",
   "pitch": -41.33,
   "yaw": 20.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A7C8F46D_B38C_E605_41DD_990F75553A1C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_AD094679_BDE2_F606_41D3_949F1A3C4FDD); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 04b"
 },
 "maps": [
  {
   "hfov": 11.88,
   "yaw": 122.62,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_3_0_0_map.gif",
      "width": 27,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.88,
   "image": "this.AnimatedImageResource_AD0CC296_BDE2_CE0A_41C4_0C1EF988A580",
   "pitch": -31.04,
   "yaw": 122.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A65300A6_B38C_5E07_41DD_924F60B4ABD4",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_AD2D7661_BDE2_F606_41D5_1DDFAB551B6F); this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06a Left"
 },
 "maps": [
  {
   "hfov": 10.81,
   "yaw": 176.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_4_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -40.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.81,
   "image": "this.AnimatedImageResource_AD0F5297_BDE2_CE0A_41A1_9B4B27A9EEAB",
   "pitch": -40.02,
   "yaw": 176.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_A6B399CE_B374_6E07_41BE_FD833F45CAD7",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_AD126692_BDE2_F60A_41C8_29E60E1F3DAE); this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.91,
   "yaw": -59.78,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_5_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.91,
   "image": "this.AnimatedImageResource_AD0F2297_BDE2_CE0A_41E2_0B41D89AE887",
   "pitch": -25.58,
   "yaw": -59.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A48E8D8C_B374_E60B_41E5_6A7AF3B00CE8",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_AD5E0654_BDE2_F60E_41CB_70C53886812B); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.04,
   "yaw": -60.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_6_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.04,
   "image": "this.AnimatedImageResource_AD0FB297_BDE2_CE0A_41D0_330763397828",
   "pitch": -12.64,
   "yaw": -60.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_823DF04B_B73B_E233_41B3_8431C48D263F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_AD38866D_BDE2_F61E_41E2_4D7468BCB217); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.57,
   "yaw": -150.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_7_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -45.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.57,
   "image": "this.AnimatedImageResource_AD0E3298_BDE2_CE06_41DD_CCC89305E45F",
   "pitch": -45.21,
   "yaw": -150.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A35A5AAB_B85A_A8AB_41E3_41E0D295A3AF",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 8.36,
   "yaw": -158.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_8_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.36,
   "image": "this.AnimatedImageResource_AD0E9298_BDE2_CE06_41C2_41E072C6C4E4",
   "pitch": 8.53,
   "yaw": -158.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A46E567C_B85B_9BAD_41A9_07E6F9FEF714",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3, this.camera_AFF457CD_BDE2_F61E_41D5_A5ADFF0258D8); this.mainPlayList.set('selectedIndex', 51)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 10.76,
   "yaw": -60.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.76,
   "image": "this.AnimatedImageResource_ACE802AA_BDE2_CE1A_41D4_75958B53831E",
   "pitch": 0.71,
   "yaw": -60.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A32203F1_B69C_10BD_41E6_675DD40D1DD6",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63, this.camera_AFC457E0_BDE2_F606_41E1_C828A20AC320); this.mainPlayList.set('selectedIndex', 49)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 05"
 },
 "maps": [
  {
   "hfov": 9.5,
   "yaw": 108.05,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_1_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.5,
   "image": "this.AnimatedImageResource_ACE8B2AA_BDE2_CE1A_41E4_5B0D5AF291E4",
   "pitch": -8.34,
   "yaw": 108.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ACAC7056_B69C_2FE7_41DB_2A052CC263A4",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C, this.camera_AC923704_BDE2_F60E_41D9_BC4F04E22B19); this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.81,
   "yaw": -116.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.38,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.81,
   "image": "this.AnimatedImageResource_AD15F2A7_BDE2_CE0A_41E4_7DDFC11F80C7",
   "pitch": -15.38,
   "yaw": -116.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A355CF73_B574_11BD_41E0_5D4FB1E55AEB",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_AC8546F8_BDE2_F606_41E4_CCB1E3471E5B); this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 4.4,
   "yaw": -113.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_1_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.4,
   "image": "this.AnimatedImageResource_AD1472A7_BDE2_CE0A_41C7_37F64742BF16",
   "pitch": -8.95,
   "yaw": -113.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ACD895B7_B574_10A5_41C0_121645A3CBB6",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C, this.camera_ACB746EA_BDE2_F61A_41E7_85C90D6EA802); this.mainPlayList.set('selectedIndex', 47)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.69,
   "yaw": -24.28,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_2_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.69,
   "image": "this.AnimatedImageResource_AD14F2A8_BDE2_CE06_41CF_E961FCBE35FC",
   "pitch": -8.67,
   "yaw": -24.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A3613C37_B574_37A5_41D8_B29C6D57DA6F",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_ADD46A38_BDE2_FE06_41E3_7A18286032AC); this.mainPlayList.set('selectedIndex', 32)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.9,
   "yaw": -64.58,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.9,
   "image": "this.AnimatedImageResource_AD034299_BDE2_CE06_41DC_3995C0FB5708",
   "pitch": -32.32,
   "yaw": -64.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A623A739_B37C_620D_41BA_EC1F16031DAE",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_AF28F451_BDE2_CA06_41DA_80C13C9BCE53); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.75,
   "yaw": -83.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.67,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.75,
   "image": "this.AnimatedImageResource_AD3B528A_BDE2_CE1A_41E0_6A5A448B7C91",
   "pitch": -30.67,
   "yaw": -83.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6A7899D_B28C_2E05_41E4_2CD66509294C",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34, this.camera_ADF98A07_BDE2_FE0A_41D5_B6210CE6FACB); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.53,
   "yaw": 40.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_0_0_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.53,
   "image": "this.AnimatedImageResource_AD3A528A_BDE2_CE1A_41D4_16EB6D72CBB5",
   "pitch": -33.27,
   "yaw": 40.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A16BEE30_B28C_621A_41B4_A0885BB8C271",
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 9.54,
   "yaw": 12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.88,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.54,
   "image": "this.AnimatedImageResource_AD3A228B_BDE2_CE1A_41D0_60C70DBAFFA9",
   "pitch": -20.88,
   "yaw": 12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_ACA27E65_B6FC_DEF7_41E6_D85BF0C0F9B7",
 "rollOverDisplay": false
},
{
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "id": "Label_0C5F13A8_3BA0_A6FF_41BD_E3D21CFCE151",
 "left": 0,
 "textShadowBlurRadius": 10,
 "width": 239,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "textShadowColor": "#000000",
 "text": "360°",
 "minHeight": 1,
 "borderRadius": 0,
 "textShadowHorizontalLength": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "height": 67,
 "top": 5,
 "minWidth": 1,
 "textShadowOpacity": 1,
 "fontSize": 54,
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Label",
 "textDecoration": "none",
 "paddingBottom": 0,
 "fontWeight": "bold",
 "textShadowVerticalLength": 0,
 "shadow": false,
 "data": {
  "name": "text 1"
 }
},
{
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "id": "Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
 "left": 0,
 "textShadowBlurRadius": 10,
 "width": 271,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "textShadowColor": "#000000",
 "text": "Casa 8 Condominio La Milla",
 "minHeight": 1,
 "borderRadius": 0,
 "textShadowHorizontalLength": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "height": 31,
 "minWidth": 1,
 "bottom": 0,
 "textShadowOpacity": 1,
 "fontSize": 18,
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Label",
 "textDecoration": "none",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "textShadowVerticalLength": 0,
 "shadow": false,
 "data": {
  "name": "text 2"
 }
},
{
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": 76,
 "width": 450,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "text": "ΣΧ Studio",
 "minHeight": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 60,
 "top": "0%",
 "minWidth": 1,
 "fontSize": 31,
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Label",
 "textDecoration": "none",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "shadow": false,
 "data": {
  "name": "Label Company Name"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 50,
 "id": "Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
 "left": 10,
 "maxHeight": 50,
 "width": "100%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50.png",
 "minHeight": 1,
 "borderRadius": 0,
 "top": "0%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "bottom": "0%",
 "paddingTop": 0,
 "class": "Image",
 "scaleMode": "fit_inside",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "logo"
 }
},
{
 "horizontalAlign": "right",
 "children": [
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "width": 1199,
 "layout": "horizontal",
 "paddingRight": 15,
 "borderSize": 0,
 "right": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver",
 "propagateClick": true,
 "verticalAlign": "middle",
 "top": "0%",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "height": 60,
 "gap": 3,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-button set container"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Info"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Thumblist"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Location"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Photoalbum"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Floorplan"
 }
},
{
 "horizontalAlign": "center",
 "pressedRollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed_rollover.png",
 "maxWidth": 101,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "minWidth": 1,
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Realtor"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
 "maxHeight": 101,
 "width": 44,
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93_rollover.png",
 "minWidth": 1,
 "mode": "push",
 "paddingTop": 0,
 "iconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton Video"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "left": "15%",
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "right": "15%",
 "layout": "horizontal",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "top": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "10%",
 "scrollBarOpacity": 0.5,
 "shadowVerticalLength": 0,
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": true,
 "contentOpaque": false,
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "layout": "vertical",
 "paddingRight": 20,
 "borderSize": 0,
 "right": "15%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "top": "10%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": "80%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container X global"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "left": "15%",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "right": "15%",
 "layout": "absolute",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "top": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "10%",
 "scrollBarOpacity": 0.5,
 "shadowVerticalLength": 0,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": true,
 "contentOpaque": false,
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "left": "15%",
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "right": "15%",
 "layout": "horizontal",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "top": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "10%",
 "scrollBarOpacity": 0.5,
 "shadowVerticalLength": 0,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": true,
 "contentOpaque": false,
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "layout": "vertical",
 "paddingRight": 20,
 "borderSize": 0,
 "right": "15%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "top": "10%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": "80%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container X global"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "left": "15%",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "right": "15%",
 "layout": "absolute",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "top": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "10%",
 "scrollBarOpacity": 0.5,
 "shadowVerticalLength": 0,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": true,
 "contentOpaque": false,
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowBlurRadius": 25,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "shadowColor": "#000000",
 "right": "15%",
 "layout": "vertical",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "top": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "10%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": true,
 "contentOpaque": false,
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowBlurRadius": 25,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "15%",
 "shadowColor": "#000000",
 "right": "15%",
 "layout": "horizontal",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "scrollBarColor": "#000000",
 "shadowVerticalLength": 0,
 "top": "10%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "bottom": "10%",
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "shadowHorizontalLength": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": true,
 "contentOpaque": false,
 "data": {
  "name": "Global"
 }
},
{
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "15%",
 "layout": "vertical",
 "paddingRight": 20,
 "borderSize": 0,
 "right": "15%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "top": "10%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": "80%",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container X global"
 }
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD11C2A3_BDE2_CE0A_41D1_51CC382AC951",
 "levels": [
  {
   "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1052A3_BDE2_CE0A_41D9_789992D071B2",
 "levels": [
  {
   "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_1_HS_1_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD21F283_BDE2_CE0A_41E6_71622AF69DA7",
 "levels": [
  {
   "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD204284_BDE2_CE0E_41D2_40269B2C3056",
 "levels": [
  {
   "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD016298_BDE2_CE06_41DB_6C900462E8D2",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD01F298_BDE2_CE06_41E4_851B14B13AE7",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD006299_BDE2_CE06_4171_75047919576B",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD00C299_BDE2_CE06_41C3_30B43AB1590F",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD09A293_BDE2_CE0A_41D1_5C36A9544420",
 "levels": [
  {
   "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD253286_BDE2_CE0A_41D9_4FD6E794C0A7",
 "levels": [
  {
   "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1FA2A2_BDE2_CE0A_41DA_073B71E84565",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1E22A2_BDE2_CE0A_418C_79A7A6A15941",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_1_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1152A3_BDE2_CE0A_41B5_AD4CFABBC030",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD31A28F_BDE2_CE1A_41E7_49538DABB241",
 "levels": [
  {
   "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD30028F_BDE2_CE1A_41D3_F0EBA04E6F89",
 "levels": [
  {
   "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_1_0.png",
   "width": 1080,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD31128D_BDE2_CE1E_41B2_38CDAA87A140",
 "levels": [
  {
   "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_0_0.png",
   "width": 1040,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1572A5_BDE2_CE0E_41E5_03FB6ED51534",
 "levels": [
  {
   "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_0_0.png",
   "width": 520,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD12C2A6_BDE2_CE0A_41B3_70C7BCC951AF",
 "levels": [
  {
   "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_2_0.png",
   "width": 520,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD39B289_BDE2_CE06_41D1_57294DBB3961",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_0_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD386289_BDE2_CE06_41DA_5BBF33A51C4A",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD38D28A_BDE2_CE1A_41C4_8427A791ABBC",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD10E2A4_BDE2_CE0E_41E1_92E2BC7EEA15",
 "levels": [
  {
   "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_0_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1312A4_BDE2_CE0E_41E1_6705D6CE0BFB",
 "levels": [
  {
   "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_1_HS_1_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD30E28F_BDE2_CE1A_41DB_A7CC68CB998B",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD33728F_BDE2_CE1A_41C9_0F370E6C4D86",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_1_0.png",
   "width": 560,
   "height": 540,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD33A290_BDE2_CE06_41C1_B37CC0867E63",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_3_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD320290_BDE2_CE06_41D4_71E97C43F482",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_4_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD328290_BDE2_CE06_41D9_630C403BD6B8",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_5_0.png",
   "width": 520,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD35D291_BDE2_CE06_41E0_CD752E25D1E3",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_6_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD35A291_BDE2_CE06_41CB_4D7202663A9E",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_1_HS_7_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD221285_BDE2_CE0E_418D_2673A3FB725F",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD22D286_BDE2_CE0A_4191_07AAF07B55D1",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD22B286_BDE2_CE0A_41C8_498AE8EA25DA",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_1_HS_2_0.png",
   "width": 400,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD396289_BDE2_CE06_41E1_F2086A1C1618",
 "levels": [
  {
   "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0A5295_BDE2_CE0E_415E_2D5BDDDBEF34",
 "levels": [
  {
   "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0A2295_BDE2_CE0E_41A5_134703E8586B",
 "levels": [
  {
   "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0A8295_BDE2_CE0E_41B5_4F90740A49B5",
 "levels": [
  {
   "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_1_HS_1_0.png",
   "width": 560,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD31A28E_BDE2_CE1A_41E3_9FAC6A16E21A",
 "levels": [
  {
   "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_0_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD30128E_BDE2_CE1A_41E1_6A64D3AB5A05",
 "levels": [
  {
   "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD27F287_BDE2_CE0A_41E3_F74EA0E34C83",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD261287_BDE2_CE0A_41D1_AE5E3051BDA8",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD26C287_BDE2_CE0A_41E0_9F88616932B6",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD268287_BDE2_CE0A_41E2_BC3256944030",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_4_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3D828B_BDE2_CE1A_41D5_57FF3050E050",
 "levels": [
  {
   "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3C728C_BDE2_CE1E_41B5_919F2A837FFB",
 "levels": [
  {
   "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3C228C_BDE2_CE1E_41DB_30E364C44D88",
 "levels": [
  {
   "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD03D299_BDE2_CE06_41CD_1EAC745445DA",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD02529A_BDE2_CE3A_41BD_24A94CA808D2",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_1_0.png",
   "width": 640,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD02329A_BDE2_CE3A_41C6_87621635BCBC",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_2_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD02B29A_BDE2_CE3A_41DE_26BC7B7A97CC",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_3_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD05029B_BDE2_CE3A_41E1_14155B6B37D7",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_4_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD05829B_BDE2_CE3A_4179_1DA156A3C418",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_1_HS_5_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1392A4_BDE2_CE0E_41CA_CDDFDB858541",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_0_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1272A5_BDE2_CE0E_41E1_845200C9D85A",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1292A5_BDE2_CE0E_41B7_E241275F14B6",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_2_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD343291_BDE2_CE06_41CE_1369FB100E75",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD34A292_BDE2_CE0A_41AA_DFBEFD5AF622",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD373292_BDE2_CE0A_41CB_55C0BEAC9096",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_2_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD378292_BDE2_CE0A_41E2_3A1C85C23AC5",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD366292_BDE2_CE0A_41B4_3FACCCA447F5",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_4_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD36E293_BDE2_CE0A_41E4_2A59C2C69E8D",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_1_HS_5_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD30828E_BDE2_CE1A_41DF_1D1594E442C4",
 "levels": [
  {
   "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD33628E_BDE2_CE1A_41D5_0709E71A376D",
 "levels": [
  {
   "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_1_HS_1_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD26A288_BDE2_CE06_41CD_B7275D98BEEB",
 "levels": [
  {
   "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_ACE912A9_BDE2_CE06_41C3_246836C215B4",
 "levels": [
  {
   "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_ACE992AA_BDE2_CE1A_41D0_731A362F58D7",
 "levels": [
  {
   "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_1_0.png",
   "width": 460,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD04029B_BDE2_CE3A_41DF_77B425D6B3F0",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD07529B_BDE2_CE3A_41C8_AD0D6DD26DFA",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD07229C_BDE2_CE3E_41D3_E10116C753E2",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD07A29C_BDE2_CE3E_41D3_F13723D5AB5D",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_3_0.png",
   "width": 640,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD06229C_BDE2_CE3E_41D5_4D0FB60847B4",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_4_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD06B29D_BDE2_CE3E_41DD_52E11F43EA30",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_5_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3B128A_BDE2_CE1A_41D0_2F6A86F5CE15",
 "levels": [
  {
   "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3BF28A_BDE2_CE1A_41E4_CDC79572FAD6",
 "levels": [
  {
   "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD19629E_BDE2_CE3A_41E2_226357DF9B0A",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD19C29E_BDE2_CE3A_41DC_A2B1E6D03A64",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD18429F_BDE2_CE3A_41D8_968D9EC86F2B",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD18A29F_BDE2_CE3A_41E3_7F0C90A0F47B",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_4_0.png",
   "width": 520,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1D82A1_BDE2_CE06_41C7_4A50B9BECD4A",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_0_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1C02A1_BDE2_CE06_41E1_41CA0867DE01",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1C82A2_BDE2_CE0A_41C8_8E4D64B230C0",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1FD2A2_BDE2_CE0A_41E1_8C5ACD99881C",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD16E2A9_BDE2_CE06_41E5_F63C8959731C",
 "levels": [
  {
   "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD096293_BDE2_CE0A_41E1_4AF8D44D4065",
 "levels": [
  {
   "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD09C293_BDE2_CE0A_41D1_5510D52987C5",
 "levels": [
  {
   "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1572A6_BDE2_CE0A_41BC_800B0C6EEC1C",
 "levels": [
  {
   "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_1_HS_0_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD244286_BDE2_CE0A_41D4_8D9E8B17C242",
 "levels": [
  {
   "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_1_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3D528B_BDE2_CE1A_419A_FB4219266FAF",
 "levels": [
  {
   "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3D228B_BDE2_CE1A_41CA_A52BAEF71DB4",
 "levels": [
  {
   "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD06129D_BDE2_CE3E_41D4_39F74D680D6B",
 "levels": [
  {
   "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD08E294_BDE2_CE0E_41E3_2B07D3592015",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_0_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0B5294_BDE2_CE0E_41D5_D3C1F1928094",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0BC294_BDE2_CE0E_41CD_5776A9DDE25E",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_1_HS_2_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3F728C_BDE2_CE1E_418C_A44DB0980762",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3F228C_BDE2_CE1E_41DE_B48C7EDB2C96",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_1_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3F828D_BDE2_CE1E_41D2_BA98984565F9",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3E128D_BDE2_CE1E_41E6_F2AC9F0BF237",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_3_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0AC295_BDE2_CE0E_41E6_12940E1B0762",
 "levels": [
  {
   "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_1_HS_0_0.png",
   "width": 640,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3E828D_BDE2_CE1E_41C8_C4FF95DC4162",
 "levels": [
  {
   "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_1_HS_1_0.png",
   "width": 1040,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0B8295_BDE2_CE0E_41E5_DA516ADA771E",
 "levels": [
  {
   "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0A1295_BDE2_CE0E_41D3_F631569555A3",
 "levels": [
  {
   "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_1_HS_1_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD208285_BDE2_CE0E_41CF_42EF013EA29E",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD235285_BDE2_CE0E_41E2_C02ADE1003FA",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD231285_BDE2_CE0E_41E2_BD1ABD23DDD7",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1B329F_BDE2_CE3A_41DC_A35F0A822B23",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1BA2A0_BDE2_CE06_41E3_3FB79B8F5367",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1A32A0_BDE2_CE06_41D9_F1F8A9C1B001",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1D32A1_BDE2_CE06_41E1_4DD344BC13D8",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_4_0.png",
   "width": 520,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD39D288_BDE2_CE06_41D6_41D2A103463B",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD263288_BDE2_CE06_4186_C56DC784AAB2",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_1_HS_2_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1762A8_BDE2_CE06_41E6_07CEA8951F4F",
 "levels": [
  {
   "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0D7296_BDE2_CE0A_4184_FC5B749293A2",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_0_0.png",
   "width": 640,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0C4296_BDE2_CE0A_41D5_AB63CFD01ABC",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0CC296_BDE2_CE0A_41C4_0C1EF988A580",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_3_0.png",
   "width": 480,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0F5297_BDE2_CE0A_41A1_9B4B27A9EEAB",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_4_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0F2297_BDE2_CE0A_41E2_0B41D89AE887",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_5_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0FB297_BDE2_CE0A_41D0_330763397828",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_6_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0E3298_BDE2_CE06_41DD_CCC89305E45F",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_7_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD0E9298_BDE2_CE06_41C2_41E072C6C4E4",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_1_HS_8_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_ACE802AA_BDE2_CE1A_41D4_75958B53831E",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_ACE8B2AA_BDE2_CE1A_41E4_5B0D5AF291E4",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_1_0.png",
   "width": 460,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD15F2A7_BDE2_CE0A_41E4_7DDFC11F80C7",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1472A7_BDE2_CE0A_41C7_37F64742BF16",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_1_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD14F2A8_BDE2_CE06_41CF_E961FCBE35FC",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_2_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD034299_BDE2_CE06_41DC_3995C0FB5708",
 "levels": [
  {
   "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3B528A_BDE2_CE1A_41E0_6A5A448B7C91",
 "levels": [
  {
   "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3A528A_BDE2_CE1A_41D4_16EB6D72CBB5",
 "levels": [
  {
   "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_0_0.png",
   "width": 1080,
   "height": 660,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3A228B_BDE2_CE1A_41D0_60C70DBAFFA9",
 "levels": [
  {
   "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_1_0.png",
   "width": 520,
   "height": 420,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "DropDown 2"
 },
 "popUpPaddingLeft": 15,
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "popUpBorderRadius": 5,
 "width": 200,
 "arrowBeforeLabel": false,
 "rollOverPopUpBackgroundColor": "#CE6700",
 "horizontalAlign": "center",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 15,
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "popUpShadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 15,
 "popUpGap": 2,
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#CE6700",
 "propagateClick": false,
 "backgroundColor": [
  "#F7931E"
 ],
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "popUpBackgroundOpacity": 0,
 "label": "ESCENAS",
 "popUpPaddingBottom": 10,
 "height": "100%",
 "popUpShadow": false,
 "gap": 0,
 "fontSize": "16px",
 "paddingTop": 0,
 "fontStyle": "normal",
 "arrowColor": "#FFFFFF",
 "popUpFontColor": "#FFFFFF",
 "class": "DropDown",
 "popUpPaddingTop": 10,
 "textDecoration": "none",
 "paddingBottom": 0,
 "fontWeight": "bold",
 "popUpShadowBlurRadius": 6,
 "popUpShadowSpread": 1,
 "shadow": false,
 "popUpShadowOpacity": 0
},
{
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "DropDown 5"
 },
 "popUpPaddingLeft": 15,
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
 "popUpBorderRadius": 0,
 "width": 200,
 "arrowBeforeLabel": false,
 "rollOverPopUpBackgroundColor": "#CE6700",
 "horizontalAlign": "center",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 15,
 "playList": "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "popUpShadowColor": "#000000",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 15,
 "popUpGap": 2,
 "popUpBackgroundColor": "#F7931E",
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "backgroundColorRatios": [
  0
 ],
 "selectedPopUpBackgroundColor": "#CE6700",
 "propagateClick": false,
 "height": 60,
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "popUpBackgroundOpacity": 0,
 "label": "PISCINA",
 "popUpPaddingBottom": 10,
 "backgroundColor": [
  "#F7931E"
 ],
 "popUpShadow": false,
 "gap": 0,
 "fontSize": "16px",
 "paddingTop": 0,
 "fontStyle": "normal",
 "arrowColor": "#FFFFFF",
 "popUpFontColor": "#FFFFFF",
 "class": "DropDown",
 "paddingBottom": 0,
 "popUpPaddingTop": 10,
 "textDecoration": "none",
 "fontWeight": "bold",
 "popUpShadowBlurRadius": 6,
 "popUpShadowSpread": 1,
 "shadow": false,
 "popUpShadowOpacity": 0
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "shadowBlurRadius": 6,
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "pressedRollOverIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed_rollover.png",
 "width": 60,
 "fontFamily": "Arial",
 "layout": "horizontal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "iconHeight": 17,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "paddingRight": 0,
 "borderColor": "#000000",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": 60,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 1,
 "mode": "toggle",
 "backgroundColor": [
  "#F7931E"
 ],
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "gap": 5,
 "iconBeforeLabel": true,
 "fontSize": 12,
 "paddingTop": 0,
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "fontStyle": "normal",
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "class": "Button",
 "paddingBottom": 0,
 "iconWidth": 17,
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "Button Settings"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "width": "85%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-left"
 }
},
{
 "horizontalAlign": "left",
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "layout": "absolute",
 "width": 8,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "orange line"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "layout": "vertical",
 "paddingRight": 50,
 "borderSize": 0,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "width": "50%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "height": "100%",
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 20,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-right"
 }
},
{
 "horizontalAlign": "center",
 "pressedRollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed_rollover.jpg",
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxHeight": 60,
 "width": "25%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "transparencyActive": false,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "X"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "height": 140,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "header"
 }
},
{
 "itemMaxHeight": 1000,
 "itemMaxWidth": 1000,
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "left": 0,
 "itemHorizontalAlign": "center",
 "itemLabelFontFamily": "Montserrat",
 "data": {
  "name": "ThumbnailList"
 },
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemThumbnailOpacity": 1,
 "width": "100%",
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "itemBorderRadius": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 70,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemLabelGap": 7,
 "minHeight": 1,
 "itemThumbnailBorderRadius": 0,
 "itemLabelPosition": "bottom",
 "height": "92%",
 "itemMinHeight": 50,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "itemPaddingRight": 3,
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#F7931E",
 "scrollBarMargin": 2,
 "itemBackgroundColor": [],
 "scrollBarWidth": 10,
 "itemVerticalAlign": "top",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "itemMinWidth": 50,
 "shadow": false,
 "selectedItemLabelFontWeight": "bold",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemThumbnailShadow": false,
 "horizontalAlign": "center",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemLabelTextDecoration": "none",
 "itemHeight": 160,
 "paddingRight": 70,
 "itemLabelFontWeight": "normal",
 "borderSize": 0,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "scrollBarColor": "#F7931E",
 "itemLabelFontSize": 13,
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "borderRadius": 5,
 "itemThumbnailHeight": 125,
 "scrollBarOpacity": 0.5,
 "rollOverItemLabelFontColor": "#F7931E",
 "scrollBarVisible": "rollOver",
 "bottom": -0.2,
 "itemBackgroundColorDirection": "vertical",
 "itemLabelFontColor": "#666666",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "gap": 26,
 "paddingTop": 10,
 "itemThumbnailWidth": 220,
 "itemPaddingBottom": 3,
 "class": "ThumbnailGrid",
 "itemBackgroundOpacity": 0,
 "paddingBottom": 70,
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "itemOpacity": 1,
 "itemLabelFontStyle": "normal"
},
{
 "scrollEnabled": true,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "width": "100%",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "insetBorder": false,
 "class": "WebFrame",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "WebFrame48191"
 }
},
{
 "horizontalAlign": "center",
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxHeight": 60,
 "width": "25%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingTop": 0,
 "transparencyActive": false,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "X"
 }
},
{
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontWeight": "normal",
 "playbackBarBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "playbackBarRight": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "progressBarBorderRadius": 0,
 "width": "100%",
 "paddingLeft": 0,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Georgia",
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "minWidth": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipFontColor": "#FFFFFF",
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "shadow": false,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingRight": 10,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "borderSize": 0,
 "toolTipPaddingTop": 20,
 "toolTipBorderSize": 1,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 10,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "progressBorderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarLeft": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingTop": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 10,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipFontSize": "13px",
 "toolTipTextShadowBlurRadius": 3,
 "data": {
  "name": "Floor Plan"
 },
 "toolTipShadowColor": "#333333",
 "playbackBarHeight": 10,
 "paddingBottom": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6
},
{
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "width": "100%",
 "layout": "absolute",
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "verticalAlign": "top",
 "height": 140,
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "header"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container photo"
 }
},
{
 "horizontalAlign": "center",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "layout": "absolute",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "width": "55%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-left"
 }
},
{
 "horizontalAlign": "left",
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "layout": "absolute",
 "width": 8,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "orange line"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "layout": "vertical",
 "paddingRight": 60,
 "borderSize": 0,
 "paddingLeft": 60,
 "scrollBarColor": "#0069A3",
 "backgroundOpacity": 1,
 "width": "45%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "height": "100%",
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 20,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "-right"
 }
},
{
 "horizontalAlign": "center",
 "pressedRollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed_rollover.jpg",
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxHeight": 60,
 "width": "25%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingTop": 0,
 "transparencyActive": false,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "X"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "borderRadius": 0,
 "top": "0%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "class": "Image",
 "scaleMode": "fit_outside",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "photo"
 }
},
{
 "horizontalAlign": "right",
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "layout": "horizontal",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "layout": "vertical",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 520,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 30,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container text"
 }
},
{
 "horizontalAlign": "left",
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "layout": "horizontal",
 "width": 370,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "right",
 "pressedRollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed_rollover.jpg",
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "width": "100%",
 "paddingRight": 0,
 "borderSize": 0,
 "right": 20,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "top": 20,
 "propagateClick": false,
 "verticalAlign": "top",
 "height": "36.14%",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "transparencyActive": false,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton X"
 }
},
{
 "horizontalAlign": "right",
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "width": "100%",
 "paddingRight": 0,
 "borderSize": 0,
 "right": 20,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "top": 20,
 "propagateClick": false,
 "verticalAlign": "top",
 "height": "36.14%",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingTop": 0,
 "transparencyActive": false,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton X"
 }
},
{
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontWeight": "normal",
 "playbackBarBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarRight": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "progressBarBorderRadius": 0,
 "width": "100%",
 "paddingLeft": 0,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Georgia",
 "progressLeft": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "minWidth": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipFontColor": "#FFFFFF",
 "vrPointerSelectionTime": 2000,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "shadow": false,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingRight": 10,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "borderSize": 0,
 "toolTipPaddingTop": 20,
 "toolTipBorderSize": 1,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 10,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "progressBorderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingTop": 0,
 "playbackBarLeft": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "toolTipShadowSpread": 0,
 "class": "ViewerArea",
 "toolTipFontSize": "13px",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 10,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "toolTipShadowColor": "#333333",
 "playbackBarHeight": 10,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6
},
{
 "horizontalAlign": "center",
 "pressedRollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed_rollover.png",
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxHeight": 60,
 "width": "14.22%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "top": "20%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "paddingTop": 0,
 "mode": "push",
 "transparencyActive": false,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton <"
 }
},
{
 "horizontalAlign": "center",
 "pressedRollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed_rollover.png",
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxHeight": 60,
 "width": "14.22%",
 "paddingRight": 0,
 "borderSize": 0,
 "right": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "top": "20%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "paddingTop": 0,
 "mode": "push",
 "transparencyActive": false,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "class": "IconButton",
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton >"
 }
},
{
 "horizontalAlign": "right",
 "pressedRollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed_rollover.jpg",
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxHeight": 60,
 "width": "10%",
 "paddingRight": 0,
 "borderSize": 0,
 "right": 20,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "top": 20,
 "propagateClick": false,
 "verticalAlign": "top",
 "height": "10%",
 "minWidth": 50,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "mode": "push",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingTop": 0,
 "transparencyActive": false,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "class": "IconButton",
 "paddingBottom": 0,
 "cursor": "hand",
 "shadow": false,
 "data": {
  "name": "IconButton X"
 }
},
{
 "horizontalAlign": "center",
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "borderRadius": 0,
 "top": "0%",
 "propagateClick": false,
 "verticalAlign": "bottom",
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "class": "Image",
 "scaleMode": "fit_outside",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "Image"
 }
},
{
 "horizontalAlign": "right",
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "layout": "horizontal",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "scrollBarMargin": 2,
 "paddingTop": 20,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "layout": "vertical",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 520,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "height": "100%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 30,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container text"
 }
},
{
 "horizontalAlign": "left",
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "layout": "horizontal",
 "width": 370,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "paddingRight": 10,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#F7931E",
 "width": "100%",
 "minHeight": 1,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.58vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.52vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.52vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:1.76vh;font-family:'Montserrat';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.76vh;font-family:'Montserrat';\"><B>DONEC FEUGIAT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.49vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.76vh;font-family:'Montserrat';\"><B>LOREM IPSUM:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:2.71vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "class": "HTMLText",
 "paddingBottom": 20,
 "shadow": false,
 "data": {
  "name": "HTMLText"
 }
},
{
 "horizontalAlign": "center",
 "fontColor": "#FFFFFF",
 "shadowBlurRadius": 6,
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "layout": "horizontal",
 "width": 180,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "backgroundOpacity": 0.8,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "height": 50,
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "label": "LOREM IPSUM",
 "pressedBackgroundOpacity": 1,
 "mode": "push",
 "gap": 5,
 "iconBeforeLabel": true,
 "fontSize": "1.96vh",
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Button",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "fontWeight": "bold",
 "textDecoration": "none",
 "cursor": "hand",
 "rollOverBackgroundOpacity": 1,
 "shadow": false,
 "data": {
  "name": "Button Lorem Ipsum"
 }
},
{
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#04A3E1",
 "width": "100%",
 "minHeight": 1,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "height": "45%",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.58vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.52vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.52vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV></div>",
 "class": "HTMLText",
 "paddingBottom": 10,
 "shadow": false,
 "data": {
  "name": "HTMLText18899"
 }
},
{
 "horizontalAlign": "left",
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "layout": "horizontal",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "backgroundOpacity": 0.3,
 "width": "100%",
 "minHeight": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "height": "80%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "- content"
 }
},
{
 "horizontalAlign": "left",
 "maxWidth": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "maxHeight": 200,
 "width": "25%",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "minHeight": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 1,
 "paddingTop": 0,
 "class": "Image",
 "scaleMode": "fit_inside",
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "agent photo"
 }
},
{
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "paddingRight": 10,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#F7931E",
 "width": "75%",
 "minHeight": 1,
 "borderRadius": 0,
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:2.03vh;font-family:'Montserrat';\"><B>JOHN DOE</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.49vh;font-family:'Montserrat';\">LICENSED REAL ESTATE SALESPERSON</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "class": "HTMLText",
 "paddingBottom": 10,
 "shadow": false,
 "data": {
  "name": "HTMLText19460"
 }
}],
 "gap": 10,
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "backgroundPreloadEnabled": true,
 "vrPolyfillScale": 0.5,
 "scrollBarWidth": 10,
 "mouseWheelEnabled": true,
 "class": "Player",
 "mobileMipmappingEnabled": false,
 "paddingBottom": 0,
 "contentOpaque": false,
 "shadow": false,
 "data": {
  "name": "Player468"
 }
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
