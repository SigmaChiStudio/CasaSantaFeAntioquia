(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
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
 "class": "Player",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "borderSize": 0,
 "minHeight": 20,
 "downloadEnabled": false,
 "layout": "absolute",
 "scripts": {
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "registerKey": function(key, value){  window[key] = value; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "existsKey": function(key){  return key in window; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getKey": function(key){  return window[key]; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); }
 },
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 20,
 "borderRadius": 0,
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "definitions": [{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.14,
  "pitch": 0
 },
 "id": "camera_F03A4E2C_D65C_4F5F_41B6_2B2C266F4041",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -117.19,
  "pitch": 0
 },
 "id": "camera_F3B77C5A_D65C_73FB_41E3_8254F7AC8D3F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -32.05,
  "pitch": 0
 },
 "id": "camera_F352AD85_D65C_4D49_41D5_F01012E338E8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.41,
  "pitch": 0.99
 },
 "id": "panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 123.45,
  "pitch": 0
 },
 "id": "camera_C82301A0_D65C_5547_41D6_9CA3A4601062",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.03,
  "pitch": 0
 },
 "id": "camera_C8BA90B4_D65C_534F_41E6_CD2F9F565515",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -86.9,
  "pitch": 0
 },
 "id": "camera_F5645A52_D65C_77CB_41E2_B15AB65B459D",
 "automaticZoomSpeed": 10
},
{
 "label": "Piscina 4",
 "id": "panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": 134.74,
   "backwardYaw": -103.03,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -38.8,
   "backwardYaw": 122.54,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_CD9F9F31_D66C_CD49_41E8_14933DD07B9A",
  "this.overlay_CD8FE796_D654_7D4B_41C2_529DC3D13A07"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -165.92,
  "pitch": -0.62
 },
 "id": "panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -100.12,
  "pitch": 0
 },
 "id": "camera_F3997C94_D65C_734F_41C2_5F3B39A24B36",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 29.99,
  "pitch": -7.19
 },
 "id": "panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -107.64,
  "pitch": 0
 },
 "id": "camera_C88060D0_D65C_54C7_41E4_47A9F87610E3",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.21,
  "pitch": 0
 },
 "id": "camera_F5570AAE_D65C_775B_41E2_763F183EBDEE",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 119.01,
  "pitch": 0
 },
 "id": "camera_F23E4BB4_D65C_754F_41DF_FA46CECCFAA9",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 4.68,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 45.2,
    "path": "shortest",
    "yawSpeed": 8.4,
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 15.63,
  "pitch": 0
 },
 "id": "camera_F15F6F82_D65C_4D48_41CB_984C5096DF15",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 50.16,
  "pitch": 0
 },
 "id": "camera_F0513E85_D65C_4F49_41A9_19CAA84F4637",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n 2 Piso 1",
 "id": "panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -48.56,
   "backwardYaw": 112.3,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A66E5240_B3B4_227A_41D4_EFF40490AE9A"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 116.93,
  "pitch": 0
 },
 "id": "camera_F3CACCD4_D65C_4CCF_4198_887E4626BBBD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -137.07,
  "pitch": 0
 },
 "id": "camera_F07FCE67_D65C_4FC8_41E3_5B63DAD388BE",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 1",
 "id": "panorama_BCE37E62_B294_223E_41D5_683710308D0B",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 87.5,
   "backwardYaw": 166.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": 12.37,
   "backwardYaw": 125.87,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "yaw": -140.11,
   "backwardYaw": 76.61,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3E111D5_B594_10E5_41C5_6E273440BC6E",
  "this.overlay_A3427BAC_B594_F0AB_41E3_584E8B987CCD",
  "this.overlay_F45FECC5_B754_A237_41E4_F91A927F2A47",
  "this.overlay_FE64F1A8_B757_627D_41E3_AD93A9EDCAFA",
  "this.overlay_C1761399_D65C_3579_41DD_951F8161EBAF"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -67.7,
  "pitch": 0
 },
 "id": "camera_F14DBF74_D65C_4DC8_41E7_9FE1D13F37A8",
 "automaticZoomSpeed": 10
},
{
 "label": "Jard\u00edn",
 "id": "panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -129.84,
   "backwardYaw": 72.36,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ACE3D251_B574_13FD_41C9_3ED1B5AFE731"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 114.81,
  "pitch": -5.87
 },
 "id": "panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 129,
  "class": "PanoramaCameraPosition",
  "yaw": -22.39,
  "pitch": -5.46
 },
 "id": "panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -120.79,
  "pitch": 0
 },
 "id": "camera_F2005BC8_D65C_74C7_41D4_99EF5567FE58",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 129,
  "class": "PanoramaCameraPosition",
  "yaw": -179.95,
  "pitch": 0
 },
 "id": "camera_F5DC99CD_D65C_74D8_41E1_22BBD0917F58",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.14,
  "pitch": 1.91
 },
 "id": "panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -27.29,
  "pitch": 0
 },
 "id": "camera_F22F8B9B_D65C_7579_41D0_36629910BDA7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -24.61,
  "pitch": -0.74
 },
 "id": "panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.49,
  "pitch": 0
 },
 "id": "camera_F126BF0A_D65C_4D5B_41C2_785FC5B5F2C6",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo 1 Piso 1",
 "id": "panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": -60.99,
   "backwardYaw": 41.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -63.07,
   "backwardYaw": 61.46,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": -149.26,
   "backwardYaw": -123.94,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 178.81,
   "backwardYaw": 173.04,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": 122.61,
   "backwardYaw": 153.46,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": 23.85,
   "backwardYaw": -162.46,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A7C8F46D_B38C_E605_41DD_990F75553A1C",
  "this.overlay_A65300A6_B38C_5E07_41DD_924F60B4ABD4",
  "this.overlay_A6B399CE_B374_6E07_41BE_FD833F45CAD7",
  "this.overlay_A48E8D8C_B374_E60B_41E5_6A7AF3B00CE8",
  "this.overlay_A35A5AAB_B85A_A8AB_41E3_41E0D295A3AF",
  "this.overlay_CE7775D0_D6BC_DCC7_41C8_50B0FDEAA5E8",
  "this.overlay_C196E083_D6BC_3349_41D9_DAD5DC54B30D",
  "this.overlay_CE51F47A_D6BC_53BB_41E7_635ADC6B8B2E",
  "this.overlay_CE008540_D6BC_7DC7_41E1_98F9A015A22D"
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
    "pitchSpeed": 3.89,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 22.02,
    "path": "shortest",
    "yawSpeed": 6.8,
    "targetPitch": 6.35,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -136.07,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -12.41,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 49.94,
  "pitch": 0
 },
 "id": "camera_C8514255_D65C_57C9_41CB_C39B1D379FA5",
 "automaticZoomSpeed": 10
},
{
 "label": "Patio 2",
 "id": "panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "yaw": 72.36,
   "backwardYaw": -129.84,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": 36.75,
   "backwardYaw": -81.16,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "yaw": -18.07,
   "backwardYaw": -175.53,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AEF6F510_B58C_117B_41D8_422DB0D5A80D",
  "this.overlay_AC6E0ACB_B58C_30EC_41E2_41132314EFCA",
  "this.overlay_AC95861D_B58C_1365_41E3_7692D9258B2E"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -138.69,
  "pitch": -2.79
 },
 "id": "panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.95,
  "pitch": 0
 },
 "id": "camera_C83291C0_D65C_54C7_41D6_47780809B9CC",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 2",
 "id": "panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 76.61,
   "backwardYaw": -140.11,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D"
  }
 ],
 "vfov": 180,
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
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 51.65,
  "pitch": 3.53
 },
 "id": "panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 128,
  "class": "PanoramaCameraPosition",
  "yaw": -54.41,
  "pitch": -3.06
 },
 "id": "panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -43.46,
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
    "pitchSpeed": 19.77,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 9.54,
    "path": "shortest",
    "yawSpeed": 38.72,
    "targetPitch": 7.92,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -145.96,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 106.35,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 24.81,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.36,
  "pitch": 0
 },
 "id": "camera_C9ABB26F_D65C_57D9_41E6_13D00F268124",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 4.47,
  "pitch": 0
 },
 "id": "camera_F1B35EA2_D65C_4F4B_41EA_9FF83C72B652",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -175.59,
  "pitch": 0
 },
 "id": "camera_C9D81300_D65C_5547_41AC_200C74B36C84",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 141.2,
  "pitch": 0
 },
 "id": "camera_F1368F1F_D65C_4D79_41CC_278E535854DF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -167.63,
  "pitch": 0
 },
 "id": "camera_F3DAECE7_D65C_4CC9_41E5_B02213FA746F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.23,
  "pitch": 0
 },
 "id": "camera_F01DAE4A_D65C_4FDB_41E3_E93BC04FB625",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.93,
  "pitch": 0
 },
 "id": "camera_C92E830D_D65C_5559_41E0_A2B2936DB983",
 "automaticZoomSpeed": 10
},
{
 "label": "Cocina",
 "id": "panorama_BCF619F2_B294_2E1F_41E2_371766686094",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "yaw": 109.99,
   "backwardYaw": -62.44,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": -157.07,
   "backwardYaw": -121.95,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": -162.46,
   "backwardYaw": 23.85,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6DC1EB1_B374_221D_41DE_D83EFBFFB4E6",
  "this.overlay_A7563243_B374_227D_41C1_948A1F8F4998",
  "this.overlay_A3C42F48_B856_69D5_41DF_8253C2CD632F",
  "this.overlay_C188BBEF_D6B4_54D9_41C9_2E007987D01E"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.28,
  "pitch": 0
 },
 "id": "camera_F687D3B7_D65C_5549_41E6_2C570B87064C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 70.31,
  "pitch": 0
 },
 "id": "camera_F138DF2D_D65C_4D59_41E3_CFA2D269378D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 32.97,
  "pitch": 2.87
 },
 "id": "panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -95.64,
  "pitch": 10.2
 },
 "id": "panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 17.37,
  "pitch": 0
 },
 "id": "camera_F5F3399E_D65C_757B_41D2_6F5701710A63",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 70.87,
  "pitch": 0
 },
 "id": "camera_F16BBF57_D65C_4DC8_41E1_64D635C64330",
 "automaticZoomSpeed": 10
},
{
 "label": "Piscina 2",
 "id": "panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": -52.25,
   "backwardYaw": 107.93,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -147.51,
   "backwardYaw": -114.36,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A35DDE43_B694_13DD_41DA_B50490B813A5",
  "this.overlay_CDAEC560_D674_3DC7_41DE_34EB478F6571"
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
    "pitchSpeed": 7.81,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 45.2,
    "path": "shortest",
    "yawSpeed": 14.68,
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -10.02,
  "pitch": 0
 },
 "id": "camera_F1934EC3_D65C_4CC9_41E3_5BD3063F07B4",
 "automaticZoomSpeed": 10
},
{
 "label": "Escaleras Piso 1",
 "id": "panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "yaw": 147.95,
   "backwardYaw": 72.44,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": -123.94,
   "backwardYaw": -149.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "yaw": 49.53,
   "backwardYaw": 0.05,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -26.85,
   "backwardYaw": 132.07,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "yaw": 90.13,
   "backwardYaw": 120.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": -121.95,
   "backwardYaw": -157.07,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6D0D2F2_B394_621F_41C1_6AE9CCDBB52A",
  "this.overlay_A710796D_B395_EE0A_41DA_0752F21353DE",
  "this.overlay_A712B490_B394_E61B_41A2_38730A7C0792",
  "this.overlay_A63E7C81_B3BC_66FA_41DD_AC4A0678A292",
  "this.overlay_90726D0E_B6DC_E235_41B5_EA8C6D07F42F",
  "this.overlay_C1844D29_D6AD_CD59_41D4_B939D14F1FF4",
  "this.overlay_C1BD9305_D6B4_D549_41E9_AB6B2CD9A17F",
  "this.overlay_CEE50B8E_D6B7_D55B_41D5_94EF5CFF2D99",
  "this.overlay_CC89A6A7_D66C_FF49_41D9_7F345D810E0A"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -98.25,
  "pitch": 0
 },
 "id": "camera_F5BD6956_D65C_75CB_41E9_28FF51647619",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -47.93,
  "pitch": 0
 },
 "id": "camera_F523C9DC_D65C_74FF_41E8_85393909DFCA",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 128,
  "class": "PanoramaCameraPosition",
  "yaw": -79.1,
  "pitch": -1.01
 },
 "id": "panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 119.24,
  "pitch": 0
 },
 "id": "camera_C88A40DD_D65C_54F9_41C5_EB782645754E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": 12.4,
  "pitch": 0
 },
 "id": "camera_C935F31B_D65C_5579_41BC_0E7CBAF8BC55",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -127.58,
  "pitch": 0
 },
 "id": "camera_F2A7DAC1_D65C_74C9_41E9_5B1C6D1C972F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 94.61,
  "pitch": 0
 },
 "id": "camera_F2429C19_D65C_7379_41BB_E798D58B86F9",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 32.59,
  "pitch": -8.8
 },
 "id": "panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 127,
  "class": "PanoramaCameraPosition",
  "yaw": -1.77,
  "pitch": -2.99
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
    "pitchSpeed": 17.32,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 45.2,
    "path": "shortest",
    "yawSpeed": 33.79,
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -87.64,
  "pitch": 0
 },
 "id": "camera_F1083F3B_D65C_4DB9_415D_78A57119BB28",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 24.05,
  "pitch": 0
 },
 "id": "camera_F3F8ACC0_D65C_4CC7_41E0_134CCBB9982D",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo Habitaci\u00f3n Piso 1",
 "id": "panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 152.71,
   "backwardYaw": 59.79,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "yaw": 21.26,
   "backwardYaw": -88.35,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "yaw": 131.37,
   "backwardYaw": 75.47,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -50.7,
   "backwardYaw": -149.95,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 173.04,
   "backwardYaw": 178.81,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 132.07,
   "backwardYaw": -26.85,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "yaw": 28.5,
   "backwardYaw": -78.74,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6539B97_B3BC_2206_41A5_D82F19533741",
  "this.overlay_9CDEF6CD_B6CB_AE34_41DA_8C081869FC02",
  "this.overlay_9E8069F2_B6CC_A5ED_41E4_CB4B70F88FB0",
  "this.overlay_C0D56F8C_D6D5_CD5F_41CE_0002C4457242",
  "this.overlay_C097ADD0_D6DB_CCC7_41AE_3B8E6C199E2C",
  "this.overlay_C110373C_D6DC_FDBF_41E5_2AD62A15BE8B",
  "this.overlay_C0B3D554_D6D4_5DCF_41E9_52152E2B3DCB"
 ],
 "partial": false
},
{
 "label": "Habitaci\u00f3n 3 Piso 1",
 "id": "panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "yaw": -52.79,
   "backwardYaw": 33.23,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A639D286_B38C_2207_41E0_B4CD2BCB7DDA",
  "this.overlay_C152F91F_D6D4_5579_41D8_9441C5D1AAFE"
 ],
 "partial": false
},
{
 "label": "Pasillo Piso 2",
 "id": "panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "yaw": 169.98,
   "backwardYaw": -113.65,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -83.22,
   "backwardYaw": -85.39,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "yaw": -164.37,
   "backwardYaw": -23.44,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": 94.08,
   "backwardYaw": -111.63,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "yaw": -14.05,
   "backwardYaw": 62.81,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": 92.36,
   "backwardYaw": -169.12,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A11A94FB_B29C_E60D_41D0_8D8502D57E81",
  "this.overlay_A1456C90_B29C_261B_41BD_F9A10C71356D",
  "this.overlay_A11564EB_B29C_260D_41D5_6A4CE8C0A213",
  "this.overlay_C7985656_D655_DBDD_41CA_ADCD35607696",
  "this.overlay_C14A93EF_D6EC_34D9_41C3_6275613FA629",
  "this.overlay_CE6842DD_D654_34F9_41E5_EC2F9D6A1B27"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.31,
  "pitch": 0
 },
 "id": "camera_C89E90FB_D65C_54B8_41DF_753B63DA4C2A",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -151.5,
  "pitch": 0
 },
 "id": "camera_F5979971_D65C_75C9_41BF_7775D016949B",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 1",
 "id": "panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": -133.51,
   "backwardYaw": 22.3,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": -130.06,
   "backwardYaw": -60.71,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A225C117_B29C_DE05_41E0_0C4CE54E91DE",
  "this.overlay_C0F63982_D6FC_554B_41C7_2D4E88F6BCA3"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 139.73,
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
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -136.07,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -12.41,
    "easing": "cubic_in_out"
   }
  ]
 },
 "displayOriginPosition": {
  "hfov": 165,
  "class": "RotationalCameraDisplayPosition",
  "yaw": 22.02,
  "pitch": -90,
  "stereographicFactor": 1
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.02,
  "pitch": 6.35
 },
 "id": "panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
 "displayMovements": [
  {
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear"
  },
  {
   "duration": 3000,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetPitch": 6.35,
   "easing": "cubic_in_out",
   "targetStereographicFactor": 0
  }
 ],
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -58.3,
  "pitch": -3.88
 },
 "id": "panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -57.46,
  "pitch": 0
 },
 "id": "camera_F69B83D2_D65C_54CB_41E0_DBA42F9B38E6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": 43.2,
  "pitch": -3.92
 },
 "id": "panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -13.11,
  "pitch": 0
 },
 "id": "camera_C8EF4125_D65C_5549_41DB_7D2557A4240C",
 "automaticZoomSpeed": 10
},
{
 "label": "Comedor 2",
 "id": "panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -155.95,
   "backwardYaw": -27.47,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3CA1829_B58C_1FAC_41D2_7D150963EF5A",
  "this.overlay_F74E4707_B75C_AE33_41CC_032D81451266"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 156.53,
  "pitch": 3.87
 },
 "id": "panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Ba\u00f1o Social Piso 1",
 "id": "panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 72.44,
   "backwardYaw": 147.95,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 75.47,
   "backwardYaw": 131.37,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6769466_B38C_6607_41B2_7DAC595DA138",
  "this.overlay_848EA393_B73F_6653_41C1_9494860D7408"
 ],
 "partial": false
},
{
 "label": "Pasillo Habitaci\u00f3n P Piso 2",
 "id": "panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": 12.22,
   "backwardYaw": -109.69,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -169.12,
   "backwardYaw": 92.36,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "yaw": 93.1,
   "backwardYaw": -109.13,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -167.6,
   "backwardYaw": -85.66,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A111A483_B293_E6FD_41E0_493A02B80FB7",
  "this.overlay_A6D36010_B294_FE1A_41C2_787255E488AB",
  "this.overlay_C22FBB85_D6B4_493E_41E3_F5949EDD00D8",
  "this.overlay_CE13689F_D654_5379_41D1_55F93BCF0F29"
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
    "pitchSpeed": 75.78,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -128.19,
    "path": "shortest",
    "yawSpeed": 151.26,
    "targetPitch": -14.32,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -115.76,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -47.55,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 36.48,
  "pitch": 0
 },
 "id": "camera_C842F23A_D65C_57BB_41C8_8FD8128D7863",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 149.94,
  "pitch": 0
 },
 "id": "camera_F1835EB5_D65C_4F49_41D2_7B6C2EC7CCD6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -119.81,
  "pitch": 9.37
 },
 "id": "panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 73.62,
  "pitch": 0
 },
 "id": "camera_C96C235D_D65C_55F9_41E7_35EA0C8FEE87",
 "automaticZoomSpeed": 10
},
{
 "label": "Ducha Habitaci\u00f3n Piso 1",
 "id": "panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -78.74,
   "backwardYaw": 28.5,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "yaw": -69.85,
   "backwardYaw": 100.94,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A79FC131_B3BD_DE1D_41CB_6D0DB5D6FBA8",
  "this.overlay_A6640D08_B3BC_260B_41DC_5121CDCA6EA7"
 ],
 "partial": false
},
{
 "label": "Habitacion P 1 Piso 2",
 "id": "panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "yaw": 153.72,
   "backwardYaw": -86.71,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "yaw": 73.73,
   "backwardYaw": -96.87,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -111.63,
   "backwardYaw": 94.08,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -109.69,
   "backwardYaw": 12.22,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A7E706F3_B294_621D_41E5_19D2605D803E",
  "this.overlay_A7515888_B294_2E0B_41E6_514DE0AF929D",
  "this.overlay_C126E2AC_D6BC_7B4E_41E5_088C3EDAC1EB",
  "this.overlay_C06E9E5F_D6EC_4FF9_41D4_B8CF92DE5379"
 ],
 "partial": false
},
{
 "label": "Escaleras Terraza",
 "id": "panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -113.65,
   "backwardYaw": 169.98,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": -143.52,
   "backwardYaw": -0.59,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A116EB46_B29C_6207_41E0_442B55E89DA4",
  "this.overlay_A6EC268E_B29C_2207_41DB_EF3BE4C5AF26"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -54.13,
  "pitch": 0
 },
 "id": "camera_C8E86134_D65C_554F_41CD_B78D6045B27F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 128,
  "class": "PanoramaCameraPosition",
  "yaw": 59.38,
  "pitch": 0
 },
 "id": "camera_F33C3D13_D65C_4D49_41E0_471190C6DCBE",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -118.72,
  "pitch": 1.94
 },
 "id": "panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 85.89,
  "pitch": 0
 },
 "id": "camera_F0D81E10_D65C_4F47_41DE_9C0D1ACA559C",
 "automaticZoomSpeed": 10
},
{
 "label": "Cocina 2",
 "id": "panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "yaw": -62.44,
   "backwardYaw": 109.99,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A623A739_B37C_620D_41BA_EC1F16031DAE"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 76.97,
  "pitch": 0
 },
 "id": "camera_F68983C4_D65C_54CF_41CC_128A0F78C732",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -33.14,
  "pitch": 9.64
 },
 "id": "panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Piscina 3",
 "id": "panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "yaw": 107.93,
   "backwardYaw": -52.25,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "yaw": -60.76,
   "backwardYaw": 168.13,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "yaw": -103.03,
   "backwardYaw": 134.74,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A32203F1_B69C_10BD_41E6_675DD40D1DD6",
  "this.overlay_CDCE8E5E_D66C_4FFB_41E8_16B55305009D",
  "this.overlay_CBBAB8CC_D654_D4DF_41CE_AD0615F302AE"
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
    "pitchSpeed": 58.4,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 15.91,
    "path": "shortest",
    "yawSpeed": 116.35,
    "targetPitch": 3.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 57.48,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -14.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.95,
  "pitch": 0
 },
 "id": "camera_F6AE939F_D65C_5579_41E0_6AFBB588090B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 52.12,
  "pitch": 0
 },
 "id": "camera_C918C350_D65C_55C8_41B1_93CD3AD5B9C8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": 129.3,
  "pitch": 0
 },
 "id": "camera_F57CEA80_D65C_7747_41B1_B4906D0B1D56",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.57,
  "pitch": 0
 },
 "id": "camera_F00D9E3B_D65C_4FB9_41E7_BC28B75775EC",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo exterior 1",
 "id": "panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "yaw": 18.97,
   "backwardYaw": -173.43,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -94.11,
   "backwardYaw": -104.77,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3E15370_B58C_11BC_41E6_4C27776DF80D",
  "this.overlay_CB69F932_D67C_F54B_41E1_3D5D448D006E"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45.26,
  "pitch": 0
 },
 "id": "camera_F0F81DEC_D65C_4CDF_41A9_6F3E61CA4C09",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19,
  "pitch": 4.06
 },
 "id": "panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 53.06,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 15.91,
    "path": "shortest",
    "yawSpeed": 105.6,
    "targetPitch": 3.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 57.48,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -14.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -131.02,
  "pitch": 0
 },
 "id": "camera_C9876289_D65C_5759_41D4_DE9E0D7F3789",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -139.29,
  "pitch": 0
 },
 "id": "camera_F5101A3B_D65C_77B9_41E7_30D5BCD12C6E",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo exterior 2",
 "id": "panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "yaw": -173.43,
   "backwardYaw": 18.97,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "yaw": 4.41,
   "backwardYaw": 53.93,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3BE4913_B58C_117D_41D2_272BE5657E02",
  "this.overlay_AC6CF670_B58C_13BB_41E5_7D3E6F2E0DCC"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.87,
  "pitch": 0
 },
 "id": "camera_FEE09FCC_D65C_4CDF_41E4_505D3F99B6E1",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -156.15,
  "pitch": 0
 },
 "id": "camera_F0974DBF_D65C_4CB9_41CC_8E6373D37968",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -36.74,
  "pitch": -6.17
 },
 "id": "panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 155.72,
  "pitch": 0
 },
 "id": "camera_F06FCE5A_D65C_4FFB_41E7_A245B639F3CA",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.19,
  "pitch": -0.38
 },
 "id": "panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 2 Piso 2",
 "id": "panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": -86.71,
   "backwardYaw": 153.72,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6A7899D_B28C_2E05_41E4_2CD66509294C"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 152.53,
  "pitch": 0
 },
 "id": "camera_F04FCE76_D65C_4FC8_41E7_015C577AB716",
 "automaticZoomSpeed": 10
},
{
 "label": "Ba\u00f1o Habitaci\u00f3n Piso 1",
 "id": "panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "yaw": 100.94,
   "backwardYaw": -69.85,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -88.35,
   "backwardYaw": 21.26,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_C0B5F3E0_D6EC_34C7_41DC_538232F5D8A9",
  "this.overlay_C09B408E_D6ED_D35B_41E9_AFD59FBEC726"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.54,
  "pitch": 0
 },
 "id": "camera_C868621D_D65C_5779_41DA_06EA061AFA5F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 45.2,
  "pitch": -4.99
 },
 "id": "panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 17.54,
  "pitch": 0
 },
 "id": "camera_C87F222C_D65C_575F_41D2_D57FD08464BD",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 44, 45)",
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 45, 46)",
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 46, 47)",
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 47, 48)",
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 48, 49)",
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 49, 50)",
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 50, 51)",
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 51, 52)",
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 52, 0)",
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 58.05,
  "pitch": 0
 },
 "id": "camera_F084FDAF_D65C_4D59_41D6_BA9A9D2AEA31",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 0, 1)",
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 1, 2)",
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 2, 3)",
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 3, 4)",
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 4, 5)",
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 5, 6)",
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist, 6, 0)",
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 106.74,
  "pitch": -3.26
 },
 "id": "panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": 10.88,
  "pitch": 0
 },
 "id": "camera_F386AC6D_D65C_73D9_41E5_D2B3D0D5D173",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 32)",
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, 33)",
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, 34)",
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, 35)",
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, 36)",
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, 37)",
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, 38)",
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, 39)",
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, 40)",
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, 41)",
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, 42)",
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, 43)",
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 43, 44)",
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 44, 45)",
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 45, 46)",
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 46, 47)",
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 47, 48)",
   "media": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 48, 49)",
   "media": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 49, 50)",
   "media": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 50, 51)",
   "media": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 51, 52)",
   "media": "this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 52, 0)",
   "media": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist"
},
{
 "label": "Piscina 1",
 "id": "panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "yaw": 42.93,
   "backwardYaw": -170.83,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63",
   "yaw": -114.36,
   "backwardYaw": -147.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034",
   "yaw": 122.54,
   "backwardYaw": -38.8,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AC08694A_B68C_31EF_41AF_C3038D9E6E8C",
  "this.overlay_CB0AEB02_D675_D54B_41AF_7187873FB270",
  "this.overlay_CB8004A8_D65C_D347_41E2_EA8735985B8C"
 ],
 "partial": false
},
{
 "label": "Sala 1 Piso 2",
 "id": "panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": 62.81,
   "backwardYaw": -14.05,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "yaw": -29.22,
   "backwardYaw": -133.62,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A15A77A4_B28C_223B_41D4_961EBEF9520D",
  "this.overlay_A1426398_B28C_220B_41CF_5CB6C0F48471",
  "this.overlay_A1539037_B2F3_FE05_41D2_2E8B1531C992"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.72,
  "pitch": 0
 },
 "id": "camera_F0C84E00_D65C_4F47_41EA_6F6C74850B56",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.55,
  "pitch": -2.33
 },
 "id": "panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -48.63,
  "pitch": 0
 },
 "id": "camera_F0A28D94_D65C_4D4F_41E2_4096BF0FDF65",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -107.56,
  "pitch": 0
 },
 "id": "camera_F5C639AD_D65C_7559_41E5_2F851E0CAB21",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 98.84,
  "pitch": 0
 },
 "id": "camera_F1A16E93_D65C_4F49_41A3_CE06ECFC241D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 127,
  "class": "PanoramaCameraPosition",
  "yaw": -131.74,
  "pitch": 0
 },
 "id": "camera_C8983109_D65C_5558_41B8_374F826BEFE3",
 "automaticZoomSpeed": 10
},
{
 "label": "Ba\u00f1o Habitaci\u00f3n S Piso 2",
 "id": "panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "yaw": 48.26,
   "backwardYaw": -120.62,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -131.14,
   "backwardYaw": -3.11,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A11965BD_B2FC_660A_41B5_37919A2C967C",
  "this.overlay_C2C9EF08_D6D7_C936_41DE_D01468CB53A3"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 63.57,
  "pitch": 0
 },
 "id": "camera_C89770EB_D65C_54D8_41E1_C6F334810FF3",
 "automaticZoomSpeed": 10
},
{
 "label": "Escaleras Piso 2",
 "id": "panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -23.44,
   "backwardYaw": -164.37,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 0.05,
   "backwardYaw": 49.53,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6CDE92C_B28C_2E0A_4194_F30F37CAF4C8",
  "this.overlay_C08E5C4F_D6F4_F3D9_41E3_7BAA9E0DFB96"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.77,
  "pitch": 0
 },
 "id": "camera_C8D99192_D65C_554B_41E2_2ED869CF43F7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_acceleration",
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonToggleHotspots": "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.13,
  "pitch": 0
 },
 "id": "camera_C8C7D15C_D65C_55FF_41D0_77F8362F6FAF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -96.45,
  "pitch": 0
 },
 "id": "camera_F2B78AD4_D65C_74CF_41E2_C7979EBB660F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -145.96,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 106.35,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 24.81,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.54,
  "pitch": 7.92
 },
 "id": "panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 127,
  "class": "PanoramaCameraPosition",
  "yaw": 48.86,
  "pitch": 0
 },
 "id": "camera_C912F342_D65C_55C8_41E7_178D52876897",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.74,
  "pitch": 0
 },
 "id": "camera_F5CBD9BB_D65C_74B9_41E1_C5112E29DF65",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -115.76,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -47.55,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -128.19,
  "pitch": -14.32
 },
 "id": "panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.28,
  "pitch": 0
 },
 "id": "camera_F3E88CAC_D65C_735F_41E8_7884ACA4FBEF",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.75,
  "pitch": 0
 },
 "id": "camera_F0E6EDCD_D65C_4CD9_41D0_9697D0F0897C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.88,
  "pitch": 1.97
 },
 "id": "panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 65.64,
  "pitch": 0
 },
 "id": "camera_C80281D9_D65C_54F9_41DB_132EEC31A48E",
 "automaticZoomSpeed": 10
},
{
 "label": "Entrada 2",
 "id": "panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": 18.05,
   "backwardYaw": -116.43,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -159.86,
   "backwardYaw": -5.69,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3B03E31_B594_13BD_41D3_974DC13A7193",
  "this.overlay_A386E8BA_B594_70AC_41E4_A461BFCF4CD8",
  "this.overlay_A39912AD_B594_10A5_41DC_4C47E8D4EB26"
 ],
 "partial": false
},
{
 "label": "Terraza 2",
 "id": "panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "yaw": -0.59,
   "backwardYaw": -143.52,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "yaw": -60.71,
   "backwardYaw": -130.06,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": 91.56,
   "backwardYaw": 6.64,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "yaw": 48.7,
   "backwardYaw": 48.98,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6A05E9E_B294_2206_4198_456CF856B339",
  "this.overlay_A4C571CE_B294_7E07_41D1_47E11FFE9D44",
  "this.overlay_A10D4886_B294_6E07_41A8_FDEB9B15FA4E",
  "this.overlay_A4A048F5_B6CB_63D7_41E2_CADAF7431EB9"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -167.78,
  "pitch": 0
 },
 "id": "camera_C8D1B184_D65C_554F_41D8_9F37D4B8F4AA",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.69,
  "pitch": -0.26
 },
 "id": "panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 97.3,
  "pitch": 3.18
 },
 "id": "panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 128,
  "class": "PanoramaCameraPosition",
  "yaw": 110.15,
  "pitch": 0
 },
 "id": "camera_FE8E9FAE_D65C_4D5B_41C8_34867CBD0F85",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -63.29,
  "pitch": 0.14
 },
 "id": "panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -59.36,
  "pitch": 0
 },
 "id": "camera_F53489EF_D65C_74D9_41DD_D8E05B512E79",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 2 Piso 2",
 "id": "panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "yaw": -133.62,
   "backwardYaw": -29.22,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "yaw": -30.06,
   "backwardYaw": -162.63,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6F613F2_B2F4_221F_41C4_11EC6A5D6BC3",
  "this.overlay_A66E538A_B2F4_E20F_41BD_C6E949D03F29"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.79,
  "pitch": -0.47
 },
 "id": "panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Calle",
 "id": "panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
   "yaw": -24.28,
   "backwardYaw": -56.55,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "yaw": -113.28,
   "backwardYaw": -5.53,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "yaw": -116.43,
   "backwardYaw": 18.05,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A355CF73_B574_11BD_41E0_5D4FB1E55AEB",
  "this.overlay_ACD895B7_B574_10A5_41C0_121645A3CBB6",
  "this.overlay_CD3B7998_D674_5547_41E4_51BDAE0B198F"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 91.65,
  "pitch": 0
 },
 "id": "camera_F289BB08_D65C_7547_41C8_7152791D05D8",
 "automaticZoomSpeed": 10
},
{
 "label": "Sala 3 Piso 2",
 "id": "panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "yaw": -162.63,
   "backwardYaw": -30.06,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6C644CF_B2F5_E605_41C2_03F4FA4A3D05",
  "this.overlay_A11C2CBC_B2F4_660B_41C3_9754038D0D88"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 54.94,
  "pitch": -2.69
 },
 "id": "panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Ducha Habitaci\u00f3n S Piso 2",
 "id": "panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "yaw": -120.62,
   "backwardYaw": 48.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A900D003_B6F4_E233_41E0_F870378D67EA",
  "this.overlay_C22ED95E_D6D4_49CA_41E0_F24E9C26000C"
 ],
 "partial": false
},
{
 "label": "Ba\u00f1o Habitaci\u00f3n P Piso 2",
 "id": "panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -109.13,
   "backwardYaw": 93.1,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "yaw": 79.88,
   "backwardYaw": -67.45,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6E4DD05_B294_6605_41E2_C92C885527A9",
  "this.overlay_A63AE262_B294_223F_41E4_134E4A27BD52"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.37,
  "pitch": 0
 },
 "id": "camera_F3A4FC42_D65C_73CB_41DE_2D6B441854FE",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.74,
  "pitch": -1.08
 },
 "id": "panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 150.78,
  "pitch": 0
 },
 "id": "camera_F5EE598E_D65C_755B_4190_F17E65C91A88",
 "automaticZoomSpeed": 10
},
{
 "label": "Entrada Piscina",
 "id": "panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": -56.55,
   "backwardYaw": -24.28,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688",
   "yaw": -170.83,
   "backwardYaw": 42.93,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A327DE79_B68C_33AD_4193_D0A50D92FF3D",
  "this.overlay_CA99BA42_D674_37CB_41E7_8235203302FE"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -79.06,
  "pitch": 0
 },
 "id": "camera_F59B7980_D65C_7547_41D0_4AE656BF540D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -104.27,
  "pitch": -0.96
 },
 "id": "panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -70.01,
  "pitch": 0
 },
 "id": "camera_C8B010A6_D65C_534B_41C2_531E7A4FBC24",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.38,
  "pitch": 0
 },
 "id": "camera_C9D5D2F2_D65C_54CB_41DF_C2AFEF7F2858",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.29,
  "pitch": 0
 },
 "id": "camera_C8FC914E_D65C_55DB_41A5_4EC514B40F8F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -106.27,
  "pitch": 0
 },
 "id": "camera_F50A9A23_D65C_7749_41E9_C62BF8C4A7D4",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 131.44,
  "pitch": 0
 },
 "id": "camera_F540DA98_D65C_7747_41E0_C5D87AD59EA3",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 138.42,
  "pitch": 1.77
 },
 "id": "panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 17.11,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 45.2,
    "path": "shortest",
    "yawSpeed": 33.37,
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -85.92,
  "pitch": 0
 },
 "id": "camera_C8CFC16B_D65C_55D9_41E8_3006CB338052",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 30.05,
  "pitch": 0
 },
 "id": "camera_F2EBBB3B_D65C_75B9_41A2_ED76ADFD57AB",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.5,
  "pitch": 0
 },
 "id": "camera_F211ABDB_D65C_74F9_41D0_61BC264DDBED",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -120.21,
  "pitch": 0
 },
 "id": "camera_F2B9CAED_D65C_74D9_41D0_11CA964FE2E9",
 "automaticZoomSpeed": 10
},
{
 "label": "Pasillo Habitaci\u00f3n S Piso 2",
 "id": "panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "yaw": -85.66,
   "backwardYaw": -167.6,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "yaw": -85.39,
   "backwardYaw": -83.22,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "yaw": -3.11,
   "backwardYaw": -131.14,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "yaw": 81.75,
   "backwardYaw": -127.88,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "yaw": 83.55,
   "backwardYaw": -106.38,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A12EA653_B2FC_221E_41C2_244655C0F12F",
  "this.overlay_C584AB59_D6D4_49D6_41E2_4926261DF51C",
  "this.overlay_C5B5E56A_D6D4_59CA_41E7_5B3EDE119AF5",
  "this.overlay_C215FB75_D6DC_49DF_41C8_65485FB4B034",
  "this.overlay_CBA72890_D655_D347_41B7_8B21F512E37C"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -118.54,
  "pitch": 0
 },
 "id": "camera_C81411F5_D65C_54C9_41C0_60610CD64AF4",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 153.15,
  "pitch": 0
 },
 "id": "camera_F2CC7B73_D65C_75C9_41E0_EECD5EF27B88",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n S 1 Piso 2",
 "id": "panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -127.88,
   "backwardYaw": 81.75,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "yaw": 52.42,
   "backwardYaw": -104.7,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6EB9B77_B2FC_2205_41E0_A090AA0C43CD",
  "this.overlay_C07B77C1_D6D4_5936_41DB_D5520517D5B9"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 129,
  "class": "PanoramaCameraPosition",
  "yaw": 156.56,
  "pitch": 0
 },
 "id": "camera_F252AC2D_D65C_7359_41E3_0DCCC50188BB",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 129,
  "class": "PanoramaCameraPosition",
  "yaw": -9.26,
  "pitch": -8.54
 },
 "id": "panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Ducha Habitaci\u00f3n P Piso 2",
 "id": "panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "yaw": -67.45,
   "backwardYaw": 79.88,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A151E8BA_B294_EE0C_41D7_D78A106E34D6",
  "this.overlay_A1330E00_B2F4_65FB_41DB_A2656859E799"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -6.96,
  "pitch": 0
 },
 "id": "camera_C863A210_D65C_5747_4166_AEB808F03D88",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.83,
  "pitch": 12.47
 },
 "id": "panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 46.84,
  "pitch": -1.09
 },
 "id": "panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -143.25,
  "pitch": 0
 },
 "id": "camera_F32C3CFF_D65C_4CB9_41DA_219A78ADD24A",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 4 Piso 2",
 "id": "panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "yaw": 40.71,
   "backwardYaw": 101.4,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A16BEE30_B28C_621A_41B4_A0885BB8C271",
  "this.overlay_ACA27E65_B6FC_DEF7_41E6_D85BF0C0F9B7"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 129,
  "class": "PanoramaCameraPosition",
  "yaw": 112.55,
  "pitch": 0
 },
 "id": "camera_F5693A6B_D65C_77D9_41DD_64E02349620E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": -104.53,
  "pitch": 0
 },
 "id": "camera_F29BBB23_D65C_7549_41E3_4DB9E7258351",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n S 2 Piso 2",
 "id": "panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "yaw": -104.7,
   "backwardYaw": 52.42,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "yaw": -106.38,
   "backwardYaw": 83.55,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A69FC48F_B2F4_2605_41B7_882B095D5499",
  "this.overlay_A6C350C4_B2F4_7E7B_41D9_ED8FC1575B96"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 124,
  "class": "PanoramaCameraPosition",
  "yaw": -158.74,
  "pitch": 0
 },
 "id": "camera_FE90CFBC_D65C_4CBF_41DA_CB6D6200B20E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -1.19,
  "pitch": 0
 },
 "id": "camera_F2FD2B58_D65C_75C7_41B3_D3450AB164E0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 22.98,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -177.35,
    "path": "shortest",
    "yawSpeed": 45.17,
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.64,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -0.72,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 179.41,
  "pitch": 0
 },
 "id": "camera_F1F59EE1_D65C_4CC9_41BE_0525A7D1C931",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitaci\u00f3n 1 Piso 1",
 "id": "panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": -149.95,
   "backwardYaw": -50.7,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "yaw": 112.3,
   "backwardYaw": -48.56,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "yaw": 33.23,
   "backwardYaw": -52.79,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A66EEB8F_B3B4_2206_41D9_B472B986BFC2",
  "this.overlay_CE21D90F_D6DF_F559_41BE_157772919862",
  "this.overlay_C1423D89_D6DD_CD59_41DA_4F77B38144D7"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 128,
  "class": "PanoramaCameraPosition",
  "yaw": 101.26,
  "pitch": 0
 },
 "id": "camera_F2DC1B87_D65C_7549_41D4_163DFBF450FB",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -126.07,
  "pitch": 0
 },
 "id": "camera_C884B0C2_D65C_54CB_41C8_61E7D0BF57DA",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 57.48,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -14.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.91,
  "pitch": 3.99
 },
 "id": "panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 89.25,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -128.19,
    "path": "shortest",
    "yawSpeed": 178.33,
    "targetPitch": -14.32,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -115.76,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -47.55,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 66.35,
  "pitch": 0
 },
 "id": "camera_F261EBEE_D65C_74DB_41E5_EBA92FF20C51",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 39.89,
  "pitch": 0
 },
 "id": "camera_F3890C81_D65C_7349_41CF_059C9608F141",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.06,
  "pitch": 0
 },
 "id": "camera_C81C8202_D65C_5748_41E3_F8C1E42D9936",
 "automaticZoomSpeed": 10
},
{
 "label": "Habitacion P 3 Piso 2",
 "id": "panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "yaw": -96.87,
   "backwardYaw": 73.73,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "yaw": 101.4,
   "backwardYaw": 40.71,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A15EDDED_B28F_E605_41E3_95E1B137D21C",
  "this.overlay_A6361CB7_B28C_2605_41D8_2365410F49EF"
 ],
 "partial": false
},
{
 "label": "Pasillo 2 Piso 1",
 "id": "panorama_BCF67E95_B294_6205_41E6_4008DC577345",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "yaw": 59.79,
   "backwardYaw": 152.71,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 41.66,
   "backwardYaw": -60.99,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "yaw": -143.72,
   "backwardYaw": 59.21,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 166.89,
   "backwardYaw": 87.5,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A581B76C_B294_220B_41E2_C3CF23E91DAD",
  "this.overlay_A5FBFFD5_B294_2205_41D6_BBFDC66D6532",
  "this.overlay_A591AD1C_B29C_260B_41E5_1609317911D1",
  "this.overlay_C1A844C6_D6B4_FCCB_41E9_2FC61649F7CC",
  "this.overlay_CE2ED096_D6AB_F34B_41E1_7E4DC51E8C9E",
  "this.overlay_CEE39197_D6AF_D549_41C8_721A003956EE"
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
    "pitchSpeed": 7.36,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 45.2,
    "path": "shortest",
    "yawSpeed": 13.78,
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 96.78,
  "pitch": 0
 },
 "id": "camera_C93B3329_D65C_5559_41D7_BE143CE2F2F6",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 168.66,
  "pitch": 3.13
 },
 "id": "panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -151.42,
  "pitch": 9.02
 },
 "id": "panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Comedor 1",
 "id": "panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "yaw": 59.21,
   "backwardYaw": -143.72,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "yaw": -27.47,
   "backwardYaw": -155.95,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 61.46,
   "backwardYaw": -63.07,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "yaw": 125.87,
   "backwardYaw": 12.37,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -81.16,
   "backwardYaw": 36.75,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3F57B2F_B58C_31A5_41B1_C3B0D323E499",
  "this.overlay_A3ACC614_B58C_137B_41E1_232DBC95532F",
  "this.overlay_A3FB9C62_B58C_17DF_41B2_2D2AE041D46F",
  "this.overlay_A3DD8EFE_B58C_70A7_41B4_362FA234601A",
  "this.overlay_A3D22D14_B594_117B_41E6_760EE19E43F8",
  "this.overlay_8B6BE10B_B75C_E233_41D1_BA093F4471F8",
  "this.overlay_CE1A804C_D6AC_33DF_41C7_F932BE4726B8"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.87,
  "pitch": 0
 },
 "id": "camera_F0F69DDC_D65C_4CFF_41CB_8BC2E7171F7D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -78.6,
  "pitch": 0
 },
 "id": "camera_C8E5C117_D65C_5549_41B2_E2BD73E25A19",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 22.93,
  "pitch": 0
 },
 "id": "camera_F5391A0E_D65C_775B_41E4_D1050E37BC7A",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.09,
  "pitch": -2.49
 },
 "id": "panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 174.47,
  "pitch": 0
 },
 "id": "camera_C82B61AF_D65C_5559_41E4_B0E12174894B",
 "automaticZoomSpeed": 10
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "media": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "media": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "media": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "media": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "media": "this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 6)",
   "media": "this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 6, 7)",
   "media": "this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 7, 8)",
   "media": "this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 8, 9)",
   "media": "this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 9, 10)",
   "media": "this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 10, 11)",
   "media": "this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 11, 12)",
   "media": "this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 12, 13)",
   "media": "this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 13, 14)",
   "media": "this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 14, 15)",
   "media": "this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 15, 16)",
   "media": "this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 16, 17)",
   "media": "this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 17, 18)",
   "media": "this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 18, 19)",
   "media": "this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 19, 20)",
   "media": "this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 20, 21)",
   "media": "this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 21, 22)",
   "media": "this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 22, 23)",
   "media": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 23, 24)",
   "media": "this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 24, 25)",
   "media": "this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 25, 26)",
   "media": "this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 26, 27)",
   "media": "this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 27, 28)",
   "media": "this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 28, 29)",
   "media": "this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 29, 30)",
   "media": "this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 30, 31)",
   "media": "this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 31, 32)",
   "media": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 32, 33)",
   "media": "this.panorama_BCF619F2_B294_2E1F_41E2_371766686094",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 33, 34)",
   "media": "this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 34, 35)",
   "media": "this.panorama_BCF67E95_B294_6205_41E6_4008DC577345",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 35, 36)",
   "media": "this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 36, 37)",
   "media": "this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 37, 38)",
   "media": "this.panorama_BCE37E62_B294_223E_41D5_683710308D0B",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 38, 39)",
   "media": "this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 39, 40)",
   "media": "this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 40, 41)",
   "media": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 41, 42)",
   "media": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 42, 43)",
   "media": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 43, 44)",
   "media": "this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 44, 45)",
   "media": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 45, 46)",
   "media": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_camera",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 46, 0)",
   "media": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -138.34,
  "pitch": 0
 },
 "id": "camera_C80C21E8_D65C_54C7_41E4_FBCBD41DCFB4",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 105.21,
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
    "pitchSpeed": 3.55,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 22.02,
    "path": "shortest",
    "yawSpeed": 6.12,
    "targetPitch": 6.35,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -136.07,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -12.41,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.49,
  "pitch": 0
 },
 "id": "camera_C94B4385_D65C_5549_41D0_868D6E72E817",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.56,
  "pitch": 0
 },
 "id": "camera_F0B56DA2_D65C_4D4B_41CB_3D3D4ABC817B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 19.28,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -177.35,
    "path": "shortest",
    "yawSpeed": 37.74,
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.64,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -0.72,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 119.29,
  "pitch": 0
 },
 "id": "camera_C9EC22BF_D65C_54B9_41DF_8B6F0F10B3D2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -57.39,
  "pitch": 0
 },
 "id": "camera_F02A4E1E_D65C_4F7B_41E3_260A7CE02F69",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -125.19,
  "pitch": 7.16
 },
 "id": "panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -137.3,
  "pitch": 0.26
 },
 "id": "panorama_BCE37E62_B294_223E_41D5_683710308D0B_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Zona Ropas",
 "id": "panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA",
   "yaw": 120.64,
   "backwardYaw": 90.13,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_CF666E7B_D6AC_4FB9_41E9_DC44F6D33A39"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -130.47,
  "pitch": 0
 },
 "id": "camera_FEBEEF9F_D65C_4D79_41E7_646E004881B0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.17,
  "pitch": 0
 },
 "id": "camera_F1D73EFC_D65C_4CBF_41D6_6B5438F3C782",
 "automaticZoomSpeed": 10
},
{
 "label": "Patio 1",
 "id": "panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571",
   "yaw": 53.93,
   "backwardYaw": 4.41,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D",
   "yaw": -175.53,
   "backwardYaw": -18.07,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ACAA9B16_B58C_3164_41D1_D1A4B60E77C1",
  "this.overlay_A3AFA20C_B58C_136B_41DF_2BF4D20F8B28",
  "this.overlay_F9256439_B777_625C_41E6_18134498E027"
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
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.64,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -0.72,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.35,
  "pitch": 12.53
 },
 "id": "panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_camera",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 3",
 "id": "panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": 6.64,
   "backwardYaw": 91.56,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E",
   "yaw": 22.3,
   "backwardYaw": -133.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
   "yaw": 90.59,
   "backwardYaw": -2.05,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A1102A1B_B294_620E_41C6_0AFD68920E5F",
  "this.overlay_C6356495_D675_FF5E_41CE_ED3417E69834",
  "this.overlay_C226A2EA_D654_78CA_41C2_D9D191D4BC9A"
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
    "pitchSpeed": 18.17,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 9.54,
    "path": "shortest",
    "yawSpeed": 35.5,
    "targetPitch": 7.92,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -145.96,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 106.35,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 24.81,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -157.7,
  "pitch": 0
 },
 "id": "camera_C99362A4_D65C_574F_41C7_0A1FD6515467",
 "automaticZoomSpeed": 10
},
{
 "label": "Terraza 4",
 "id": "panorama_BCE199F0_B294_2E1B_41D1_E919D0034708",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4",
   "yaw": -2.05,
   "backwardYaw": 90.59,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D",
   "yaw": 48.98,
   "backwardYaw": 48.7,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A1D575FB_B294_660D_41E6_37913D75622D",
  "this.overlay_C6D54E66_D67C_4BFA_41E5_4940B76CE15D"
 ],
 "partial": false
},
{
 "label": "Solar",
 "id": "panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B",
   "yaw": 168.13,
   "backwardYaw": -60.76,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_CCF7BE6F_D66C_4FD9_41AA_F2AC4D64E93C"
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
    "pitchSpeed": 11.18,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 9.54,
    "path": "shortest",
    "yawSpeed": 21.45,
    "targetPitch": 7.92,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -145.96,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -9.94,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 106.35,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -29.43,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 24.81,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -15.98,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -89.41,
  "pitch": 0
 },
 "id": "camera_F31E1D3B_D65C_4DB9_41EA_2D75B60C113B",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 6.53,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -177.35,
    "path": "shortest",
    "yawSpeed": 12.11,
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.64,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -0.72,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.44,
  "pitch": 0
 },
 "id": "camera_C970C36B_D65C_55D9_41E9_54D5FFA417A3",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 15.83,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 45.2,
    "path": "shortest",
    "yawSpeed": 30.81,
    "targetPitch": -4.99,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -85.01,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.8,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 97.02,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -6.09,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -167.1,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -37.12,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 165.95,
  "pitch": 0
 },
 "id": "camera_C9F8E2D8_D65C_54C7_41E8_03790D31AB7F",
 "automaticZoomSpeed": 10
},
{
 "label": "Entrada",
 "id": "panorama_BCE2538F_B294_E206_41DB_F1184638A5E0",
 "hfov": 360,
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_t.jpg",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC",
   "yaw": -5.53,
   "backwardYaw": -113.28,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917",
   "yaw": -104.77,
   "backwardYaw": -94.11,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7",
   "yaw": 153.46,
   "backwardYaw": 122.61,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C",
   "yaw": -5.69,
   "backwardYaw": -159.86,
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A3EC57E4_B594_10DB_41E4_457C674F15AD",
  "this.overlay_CCEFB1B7_D674_5549_41D8_586F9E93083B",
  "this.overlay_CCC7FC3B_D674_D3B9_41CF_0063EBC29D3F",
  "this.overlay_CC99074D_D67C_DDD9_41B0_B9DE189FE9F6"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -72.07,
  "pitch": 0
 },
 "id": "camera_C83A81CC_D65C_54DF_41E1_4295E8540C10",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 75.3,
  "pitch": 0
 },
 "id": "camera_F580E964_D65C_75CF_41E9_21952A9FBBF7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 3.94,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -177.35,
    "path": "shortest",
    "yawSpeed": 6.91,
    "targetPitch": 12.53,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": 81.64,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -16.52,
    "easing": "cubic_in_out"
   },
   {
    "pitchSpeed": 17.05,
    "class": "TargetPanoramaCameraMovement",
    "targetYaw": -0.72,
    "path": "shortest",
    "yawSpeed": 33.25,
    "targetPitch": -18.17,
    "easing": "cubic_in_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -131.3,
  "pitch": 0
 },
 "id": "camera_F371ED67_D65C_4DC9_41E3_6D042ABB2F8C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 176.89,
  "pitch": 0
 },
 "id": "camera_F30CDD27_D65C_4D49_41EA_A63BFBC805D8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "hfov": 130,
  "class": "PanoramaCameraPosition",
  "yaw": 94.34,
  "pitch": 0
 },
 "id": "camera_F17DEF66_D65C_4DCB_41B6_7F691D7212D5",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.39,
  "pitch": 0
 },
 "id": "camera_C8F38141_D65C_55C9_41C5_8B0E38445A1F",
 "automaticZoomSpeed": 10
},
{
 "maxWidth": 1920,
 "toolTipOpacity": 0.5,
 "id": "MainViewer",
 "left": 0,
 "toolTipFontSize": "13px",
 "playbackBarBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "right": 0,
 "playbackBarHeight": 10,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 10,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "minHeight": 480,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 854,
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
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
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "shadow": false,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "maxHeight": 1080,
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "paddingRight": 0,
 "borderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "fade_out_fade_in",
 "toolTipBorderSize": 1,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "toolTipPaddingTop": 20,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "bottom": "0%",
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingBottom": 0,
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
 "left": 30,
 "width": 271,
 "class": "Container",
 "paddingRight": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "height": 97,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": 20,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "children": [
  "this.Label_0C5F13A8_3BA0_A6FF_41BD_E3D21CFCE151",
  "this.Label_0C5F23A8_3BA0_A6FF_419F_468451E37918"
 ],
 "paddingBottom": 0,
 "data": {
  "name": "--STICKER"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "children": [
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": 0,
 "height": 60,
 "backgroundOpacity": 1,
 "backgroundColor": [
  "#00CBDA",
  "#3538E8",
  "#B304E4"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  0.48,
  1
 ],
 "data": {
  "name": "--BUTTON SET"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "absolute",
 "backgroundColorDirection": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "width": 60,
 "class": "Container",
 "horizontalAlign": "center",
 "right": 15,
 "paddingRight": 0,
 "borderSize": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": 62,
 "height": 300,
 "backgroundOpacity": 1,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A"
 ],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 0,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0.02
 ],
 "data": {
  "name": "-button set"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "vertical",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
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
 "paddingRight": 30,
 "horizontalAlign": "right",
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "height": 90,
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "paddingBottom": 0,
 "data": {
  "name": "-button set container"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "---INFO photo"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "---PANORAMA LIST"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "---LOCATION"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "---FLOORPLAN"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "---PHOTOALBUM"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "class": "Container",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": true,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "---REALTOR"
 },
 "scrollBarOpacity": 0.5,
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "width": 60,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "iconHeight": 30,
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "shadowBlurRadius": 6,
 "pressedRollOverIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "height": 60,
 "backgroundOpacity": 1,
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "mode": "toggle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "iconWidth": 30,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings Mute"
 },
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "width": 60,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "iconHeight": 30,
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "shadowBlurRadius": 6,
 "pressedRollOverIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "height": 60,
 "backgroundOpacity": 1,
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "mode": "toggle",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "iconWidth": 30,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_F68983C4_D65C_54CF_41CC_128A0F78C732); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -12.93
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36D6F75_D657_CDC9_41E6_45E888176C4D",
   "pitch": -12.93,
   "yaw": 134.74,
   "distance": 50
  }
 ],
 "id": "overlay_CD9F9F31_D66C_CD49_41E8_14933DD07B9A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_F69B83D2_D65C_54CB_41E0_DBA42F9B38E6); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 8.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -38.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -8.41
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36CCF76_D657_CDCB_41E2_FAFD26E07781",
   "pitch": -8.41,
   "yaw": -38.8,
   "distance": 50
  }
 ],
 "id": "overlay_CD8FE796_D654_7D4B_41C2_529DC3D13A07",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_F14DBF74_D65C_4DC8_41E7_9FE1D13F37A8); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -48.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -35.71
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD64F4C2_D65C_3CCB_41DA_5621D019E15C",
   "pitch": -35.71,
   "yaw": -48.56,
   "distance": 100
  }
 ],
 "id": "overlay_A66E5240_B3B4_227A_41D4_EFF40490AE9A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_C8EF4125_D65C_5549_41DB_7D2557A4240C); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 87.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -29.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD7654D2_D65C_3CCB_41BB_915F39CF040E",
   "pitch": -29.85,
   "yaw": 87.5,
   "distance": 100
  }
 ],
 "id": "overlay_A3E111D5_B594_10E5_41C5_6E273440BC6E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_C8E86134_D65C_554F_41CD_B78D6045B27F); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -28.59
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD77C4D2_D65C_3CCB_41E8_FFA8B633519A",
   "pitch": -28.59,
   "yaw": 12.37,
   "distance": 100
  }
 ],
 "id": "overlay_A3427BAC_B594_F0AB_41E3_584E8B987CCD",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 8.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 9.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.78
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 281,
      "height": 273
     }
    ]
   },
   "pitch": -4.78,
   "yaw": 9.34
  }
 ],
 "id": "overlay_F45FECC5_B754_A237_41E4_F91A927F2A47",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 9.29,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 98.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -22.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.29,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD74C4D3_D65C_3CC9_41E3_B4731D99E9E7",
   "pitch": -22.04,
   "yaw": 98.96,
   "distance": 50
  }
 ],
 "id": "overlay_FE64F1A8_B757_627D_41E3_AD93A9EDCAFA",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E, this.camera_C8F38141_D65C_55C9_41C5_8B0E38445A1F); this.mainPlayList.set('selectedIndex', 38)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 15.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -140.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -18.23
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.3,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD7434D3_D65C_3CF3_416B_B81C5AC8ABAE",
   "pitch": -18.23,
   "yaw": -140.11,
   "distance": 100
  }
 ],
 "id": "overlay_C1761399_D65C_3579_41DD_951F8161EBAF",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_C88060D0_D65C_54C7_41E4_47A9F87610E3); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 17.28,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -129.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -30.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F366FF6E_D657_CDDB_41E3_20A28EEB4F39",
   "pitch": -30.72,
   "yaw": -129.84,
   "distance": 50
  }
 ],
 "id": "overlay_ACE3D251_B574_13FD_41C9_3ED1B5AFE731",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_C87F222C_D65C_575F_41D2_D57FD08464BD); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 23.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -42.58
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.98,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6384C3_D65C_3CC9_41D7_1BB8EE78E0E0",
   "pitch": -42.58,
   "yaw": 23.85,
   "distance": 100
  }
 ],
 "id": "overlay_A7C8F46D_B38C_E605_41DD_990F75553A1C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_C868621D_D65C_5779_41DA_06EA061AFA5F); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04b"
 },
 "maps": [
  {
   "hfov": 12.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 122.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -24
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD63F4C4_D65C_3CCF_41CD_26E8730F289C",
   "pitch": -24,
   "yaw": 122.61,
   "distance": 100
  }
 ],
 "id": "overlay_A65300A6_B38C_5E07_41DD_924F60B4ABD4",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_C863A210_D65C_5747_4166_AEB808F03D88); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a Left"
 },
 "maps": [
  {
   "hfov": 10.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -40.01
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6374C4_D65C_3CCF_41E0_9AACDA2171A1",
   "pitch": -40.01,
   "yaw": 178.81,
   "distance": 50
  }
 ],
 "id": "overlay_A6B399CE_B374_6E07_41BE_FD833F45CAD7",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_C80C21E8_D65C_54C7_41E4_FBCBD41DCFB4); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.83,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -24.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.83,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6014C4_D65C_3CCF_41B7_4636AD3EC375",
   "pitch": -24.8,
   "yaw": -60.99,
   "distance": 100
  }
 ],
 "id": "overlay_A48E8D8C_B374_E60B_41E5_6A7AF3B00CE8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_C81C8202_D65C_5748_41E3_F8C1E42D9936); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -46.32
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.3,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6074C4_D65C_3CCF_41E4_C55489820486",
   "pitch": -46.32,
   "yaw": -149.26,
   "distance": 100
  }
 ],
 "id": "overlay_A35A5AAB_B85A_A8AB_41E3_41E0D295A3AF",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_C81411F5_D65C_54C9_41C0_60610CD64AF4); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -63.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -13.18
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.02,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD61D4C5_D65C_3CC9_41E8_D74BD2BA2BBD",
   "pitch": -13.18,
   "yaw": -63.07,
   "distance": 100
  }
 ],
 "id": "overlay_CE7775D0_D6BC_DCC7_41C8_50B0FDEAA5E8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right"
 },
 "maps": [
  {
   "hfov": 12.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -139.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -26.49
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6164C5_D65C_3CC9_41E0_962AAB177D67",
   "pitch": -26.49,
   "yaw": -139.69,
   "distance": 50
  }
 ],
 "id": "overlay_C196E083_D6BC_3349_41D9_DAD5DC54B30D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 8.36,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_11_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 8.53
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6044C5_D65C_3CC9_41E6_872ED40CDABE",
   "pitch": 8.53,
   "yaw": -158.13,
   "distance": 50
  }
 ],
 "id": "overlay_CE51F47A_D6BC_53BB_41E7_635ADC6B8B2E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 14.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -116.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_12_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.37
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.65,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD61A4CB_D65C_3CD9_41E5_C20AD3020D3D",
   "pitch": -1.37,
   "yaw": -116.59,
   "distance": 50
  }
 ],
 "id": "overlay_CE008540_D6BC_7DC7_41E1_98F9A015A22D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEDA408_B294_660B_41D2_CCAFD434536C, this.camera_F0513E85_D65C_4F49_41A9_19CAA84F4637); this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 10.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -23.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3642F6D_D657_CDD9_41E4_5DB7E7BAE0CE",
   "pitch": -23.79,
   "yaw": 72.36,
   "distance": 50
  }
 ],
 "id": "overlay_AEF6F510_B58C_117B_41D8_422DB0D5A80D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_F1A16E93_D65C_4F49_41A3_CE06ECFC241D); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 36.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.86
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 344,
      "height": 350
     }
    ]
   },
   "pitch": -2.86,
   "yaw": 36.75
  }
 ],
 "id": "overlay_AC6E0ACB_B58C_30EC_41E2_41132314EFCA",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273, this.camera_F1B35EA2_D65C_4F4B_41EA_9FF83C72B652); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "maps": [
  {
   "hfov": 13.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -21.7
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD12C2A6_BDE2_CE0A_41B3_70C7BCC951AF",
   "pitch": -21.7,
   "yaw": -18.07,
   "distance": 50
  }
 ],
 "id": "overlay_AC95861D_B58C_1365_41E3_7692D9258B2E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_F3890C81_D65C_7349_41CF_059C9608F141); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -40.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F31D3F65_D657_CDC9_41AE_01C32B395DE3",
   "pitch": -40.04,
   "yaw": 76.61,
   "distance": 100
  }
 ],
 "id": "overlay_A3C66036_B594_EFA7_41A2_11A03EB23B88",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -19.08
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1BA2A0_BDE2_CE06_41E3_3FB79B8F5367",
   "pitch": -19.08,
   "yaw": 56.55,
   "distance": 100
  }
 ],
 "id": "overlay_A3A4236E_B594_31A7_41E3_F3D7A5338CCC",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 102.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -20.81
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F31C5F66_D657_CDCB_41C4_6D9432FEF918",
   "pitch": -20.81,
   "yaw": 102.68,
   "distance": 100
  }
 ],
 "id": "overlay_AC691B70_B594_11BB_41E0_91D054FDD64E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 4.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 53.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 151,
      "height": 151
     }
    ]
   },
   "pitch": -2.88,
   "yaw": 53.98
  }
 ],
 "id": "overlay_F3F410E6_B755_63F5_41B3_43A112BBD5A7",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right"
 },
 "maps": [
  {
   "hfov": 5.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 112.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -17.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.89,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1D32A1_BDE2_CE06_41E1_4DD344BC13D8",
   "pitch": -17.72,
   "yaw": 112.63,
   "distance": 50
  }
 ],
 "id": "overlay_FFF6FB46_B74D_A634_41D1_3C89F5F80468",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_F0974DBF_D65C_4CB9_41CC_8E6373D37968); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.39,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -42.95
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.39,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6114CB_D65C_3CD9_41D2_5E142BF01E6A",
   "pitch": -42.95,
   "yaw": -162.46,
   "distance": 100
  }
 ],
 "id": "overlay_A6DC1EB1_B374_221D_41DE_D83EFBFFB4E6",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4, this.camera_F0B56DA2_D65C_4D4B_41CB_3D3D4ABC817B); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 109.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -34.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6EA4CC_D65C_3CDF_41DD_F18681C226EE",
   "pitch": -34.77,
   "yaw": 109.99,
   "distance": 100
  }
 ],
 "id": "overlay_A7563243_B374_227D_41C1_948A1F8F4998",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 7.57
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD00C299_BDE2_CE06_41C3_30B43AB1590F",
   "pitch": 7.57,
   "yaw": -160.49,
   "distance": 100
  }
 ],
 "id": "overlay_A3C42F48_B856_69D5_41DF_8253C2CD632F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_F084FDAF_D65C_4D59_41D6_BA9A9D2AEA31); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -157.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -26.98
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6E54CC_D65C_3CDF_41CE_D9B9650989DB",
   "pitch": -26.98,
   "yaw": -157.07,
   "distance": 100
  }
 ],
 "id": "overlay_C188BBEF_D6B4_54D9_41C9_2E007987D01E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_C80281D9_D65C_54F9_41DB_132EEC31A48E); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -147.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -12.31
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ACE912A9_BDE2_CE06_41C3_246836C215B4",
   "pitch": -12.31,
   "yaw": -147.51,
   "distance": 100
  }
 ],
 "id": "overlay_A35DDE43_B694_13DD_41DA_B50490B813A5",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_C83A81CC_D65C_54DF_41E1_4295E8540C10); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 05"
 },
 "maps": [
  {
   "hfov": 7.15,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -4.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.15,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36A8F73_D657_CDC9_41A5_E6FEF8009D48",
   "pitch": -4.76,
   "yaw": -52.25,
   "distance": 100
  }
 ],
 "id": "overlay_CDAEC560_D674_3DC7_41DE_34EB478F6571",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F, this.camera_F53489EF_D65C_74D9_41DD_D8E05B512E79); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 05a Right-Up"
 },
 "maps": [
  {
   "hfov": 15.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -39.38
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.53,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5F24B7_D65C_3349_41E6_ADE5FAE9BE58",
   "pitch": -39.38,
   "yaw": 90.13,
   "distance": 50
  }
 ],
 "id": "overlay_A6D0D2F2_B394_621F_41C1_6AE9CCDBB52A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4, this.camera_F5C639AD_D65C_7559_41E5_2F851E0CAB21); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 13.42,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 147.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.58
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_2_0.png",
      "class": "ImageResourceLevel",
      "width": 449,
      "height": 449
     }
    ]
   },
   "pitch": -9.58,
   "yaw": 147.95
  }
 ],
 "id": "overlay_A710796D_B395_EE0A_41DA_0752F21353DE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_F523C9DC_D65C_74FF_41E8_85393909DFCA); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -26.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -44.21
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.89,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0BC39EC_D6EC_D4DF_414E_1C502A2325A8",
   "pitch": -44.21,
   "yaw": -26.85,
   "distance": 100
  }
 ],
 "id": "overlay_A712B490_B394_E61B_41A2_38730A7C0792",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_F5CBD9BB_D65C_74B9_41E1_C5112E29DF65); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.51,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -43.33
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.51,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5C34B7_D65C_3349_41D5_87948D642FD5",
   "pitch": -43.33,
   "yaw": -123.94,
   "distance": 100
  }
 ],
 "id": "overlay_A63E7C81_B3BC_66FA_41DD_AC4A0678A292",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 14.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -71.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -28.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.74,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5DB4B8_D65C_3347_41CB_5FFD09F99E28",
   "pitch": -28.72,
   "yaw": -71.33,
   "distance": 50
  }
 ],
 "id": "overlay_90726D0E_B6DC_E235_41B5_EA8C6D07F42F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A, this.camera_F5DC99CD_D65C_74D8_41E1_22BBD0917F58); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 11.52,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 16.21
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5D24B8_D65C_3347_41DD_B7462E4ACDED",
   "pitch": 16.21,
   "yaw": 49.53,
   "distance": 50
  }
 ],
 "id": "overlay_C1844D29_D6AD_CD59_41D4_B939D14F1FF4",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_F5391A0E_D65C_775B_41E4_D1050E37BC7A); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.59,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -121.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -26.13
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.59,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5D74B8_D65C_3347_41B9_53995D2FE492",
   "pitch": -26.13,
   "yaw": -121.95,
   "distance": 100
  }
 ],
 "id": "overlay_C1BD9305_D6B4_D549_41E9_AB6B2CD9A17F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_10_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -25.52
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5A04B8_D65C_3347_41C5_3BAA9E40D498",
   "pitch": -25.52,
   "yaw": -173.69,
   "distance": 100
  }
 ],
 "id": "overlay_CEE50B8E_D6B7_D55B_41D5_94EF5CFF2D99",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_11_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -20.49
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.56,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3090F51_D657_CDC9_41C5_DE52A4B320E2",
   "pitch": -20.49,
   "yaw": -30.08,
   "distance": 100
  }
 ],
 "id": "overlay_CC89A6A7_D66C_FF49_41D9_7F345D810E0A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_F2CC7B73_D65C_75C9_41E0_EECD5EF27B88); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 132.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -47.52
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0BB89ED_D6EC_D4D9_41EA_5601A9C0118C",
   "pitch": -47.52,
   "yaw": 132.07,
   "distance": 100
  }
 ],
 "id": "overlay_A6539B97_B3BC_2206_41A5_D82F19533741",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_F2FD2B58_D65C_75C7_41B3_D3450AB164E0); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 173.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -33.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0B939EE_D6EC_D4DB_41E4_16F0AD8A7618",
   "pitch": -33.22,
   "yaw": 173.04,
   "distance": 100
  }
 ],
 "id": "overlay_9CDEF6CD_B6CB_AE34_41DA_8C081869FC02",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_F2B9CAED_D65C_74D9_41D0_11CA964FE2E9); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -19.3
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5B04BE_D65C_3CBB_41C9_143F908554FF",
   "pitch": -19.3,
   "yaw": 152.71,
   "distance": 100
  }
 ],
 "id": "overlay_9E8069F2_B6CC_A5ED_41E4_CB4B70F88FB0",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF600D5_B297_FE05_41D8_251627B380F4, this.camera_F29BBB23_D65C_7549_41E3_4DB9E7258351); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 9.23,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 131.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.75
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.23,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5894BE_D65C_3CBB_41D8_B6B0C30D069B",
   "pitch": -3.75,
   "yaw": 131.37,
   "distance": 100
  }
 ],
 "id": "overlay_C0D56F8C_D6D5_CD5F_41CE_0002C4457242",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_F2EBBB3B_D65C_75B9_41A2_ED76ADFD57AB); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 16.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -50.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -30.7
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.99,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5804BF_D65C_3CB9_41E3_2ED265A9E183",
   "pitch": -30.7,
   "yaw": -50.7,
   "distance": 100
  }
 ],
 "id": "overlay_C097ADD0_D6DB_CCC7_41AE_3B8E6C199E2C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9, this.camera_F289BB08_D65C_7547_41C8_7152791D05D8); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.03,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 21.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -48.28
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.03,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD5984BF_D65C_3CB9_41D4_AD3C05B3B694",
   "pitch": -48.28,
   "yaw": 21.26,
   "distance": 100
  }
 ],
 "id": "overlay_C110373C_D6DC_FDBF_41E5_2AD62A15BE8B",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A, this.camera_F2DC1B87_D65C_7549_41D4_163DFBF450FB); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 13.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 28.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -28.99
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD59E4BF_D65C_3CB9_41E4_0166D2FD3A52",
   "pitch": -28.99,
   "yaw": 28.5,
   "distance": 100
  }
 ],
 "id": "overlay_C0B3D554_D6D4_5DCF_41E9_52152E2B3DCB",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012, this.camera_C8D99192_D65C_554B_41E2_2ED869CF43F7); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -25.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6464C2_D65C_3CCB_41DB_6B9B31F6B7E0",
   "pitch": -25.76,
   "yaw": -52.79,
   "distance": 100
  }
 ],
 "id": "overlay_A639D286_B38C_2207_41E0_B4CD2BCB7DDA",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 8.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -58.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -17.48
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD65D4C2_D65C_3CCB_41E2_F90EAD7E9E6C",
   "pitch": -17.48,
   "yaw": -58.01,
   "distance": 50
  }
 ],
 "id": "overlay_C152F91F_D6D4_5579_41D8_9441C5D1AAFE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_F2429C19_D65C_7379_41BB_E798D58B86F9); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -30.73
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.18,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD27F287_BDE2_CE0A_41E3_F74EA0E34C83",
   "pitch": -30.73,
   "yaw": -83.22,
   "distance": 100
  }
 ],
 "id": "overlay_A11A94FB_B29C_E60D_41D0_8D8502D57E81",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28, this.camera_F3B77C5A_D65C_73FB_41E3_8254F7AC8D3F); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 17.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.99
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 602,
      "height": 639
     }
    ]
   },
   "pitch": -8.99,
   "yaw": -14.05
  }
 ],
 "id": "overlay_A1456C90_B29C_261B_41BD_F9A10C71356D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_F386AC6D_D65C_73D9_41E5_D2B3D0D5D173); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -43.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD261287_BDE2_CE0A_41D1_AE5E3051BDA8",
   "pitch": -43.77,
   "yaw": 92.36,
   "distance": 100
  }
 ],
 "id": "overlay_A11564EB_B29C_260D_41D5_6A4CE8C0A213",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A, this.camera_F252AC2D_D65C_7359_41E3_0DCCC50188BB); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 13.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 34,
      "height": 16
     }
    ]
   },
   "pitch": -46.43
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2D8A77B_D6DC_59CA_41E6_E68B35B6C765",
   "pitch": -46.43,
   "yaw": -164.37,
   "distance": 50
  }
 ],
 "id": "overlay_C7985656_D655_DBDD_41CA_ADCD35607696",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943, this.camera_F261EBEE_D65C_74DB_41E5_EBA92FF20C51); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 17.94,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 169.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 21.4
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.94,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C3BDE73E_D6FC_5DBB_41AC_0755C4177E6C",
   "pitch": 21.4,
   "yaw": 169.98,
   "distance": 50
  }
 ],
 "id": "overlay_C14A93EF_D6EC_34D9_41C3_6275613FA629",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_F3A4FC42_D65C_73CB_41DE_2D6B441854FE); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 05a"
 },
 "maps": [
  {
   "hfov": 9.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_9_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -22.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.31,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F33ADF45_D657_CDC9_41E0_CF35AA4AE399",
   "pitch": -22.04,
   "yaw": 94.08,
   "distance": 100
  }
 ],
 "id": "overlay_CE6842DD_D654_34F9_41E5_EC2F9D6A1B27",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_C9EC22BF_D65C_54B9_41DF_8B6F0F10B3D2); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -130.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -12.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.43,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C3BE573B_D6FC_5DB9_41D7_A946E8914F2B",
   "pitch": -12.8,
   "yaw": -130.06,
   "distance": 100
  }
 ],
 "id": "overlay_A225C117_B29C_DE05_41E0_0C4CE54E91DE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_C99362A4_D65C_574F_41C7_0A1FD6515467); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 5.25,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -7.95
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.25,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CC24C44F_D6FC_F3D9_41E7_73491006AAA8",
   "pitch": -7.95,
   "yaw": -133.51,
   "distance": 100
  }
 ],
 "id": "overlay_C0F63982_D6FC_554B_41C7_2D4E88F6BCA3",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_F04FCE76_D65C_4FC8_41E7_015C577AB716); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 20.35,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -155.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -30.69
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.35,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6964D2_D65C_3CCB_41E7_13B75D59A187",
   "pitch": -30.69,
   "yaw": -155.95,
   "distance": 100
  }
 ],
 "id": "overlay_A3CA1829_B58C_1FAC_41D2_7D150963EF5A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 11.13,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -134.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.33
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 369,
      "height": 388
     }
    ]
   },
   "pitch": -5.33,
   "yaw": -134.52
  }
 ],
 "id": "overlay_F74E4707_B75C_AE33_41CC_032D81451266",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_F352AD85_D65C_4D49_41D5_F01012E338E8); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.84,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 72.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -36.5
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.84,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6544C2_D65C_3CCB_41E5_8181D82B338B",
   "pitch": -36.5,
   "yaw": 72.44,
   "distance": 100
  }
 ],
 "id": "overlay_A6769466_B38C_6607_41B2_7DAC595DA138",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_F0A28D94_D65C_4D4F_41E2_4096BF0FDF65); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 8.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 75.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -21.47
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD62A4C3_D65C_3CC9_41DF_A43FC5658198",
   "pitch": -21.47,
   "yaw": 75.47,
   "distance": 100
  }
 ],
 "id": "overlay_848EA393_B73F_6653_41C1_9494860D7408",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A, this.camera_F16BBF57_D65C_4DC8_41E1_64D635C64330); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 15.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 93.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 15
     }
    ]
   },
   "pitch": -6.32
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 509,
      "height": 509
     }
    ]
   },
   "pitch": -6.32,
   "yaw": 93.1
  }
 ],
 "id": "overlay_A111A483_B293_E6FD_41E0_493A02B80FB7",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_F1083F3B_D65C_4DB9_415D_78A57119BB28); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -36.93
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E7277C_D6DC_59CE_41DF_EA713D4542AF",
   "pitch": -36.93,
   "yaw": -169.12,
   "distance": 100
  }
 ],
 "id": "overlay_A6D36010_B294_FE1A_41C2_787255E488AB",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_F138DF2D_D65C_4D59_41E3_CFA2D269378D); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 17.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -27.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E7777C_D6DC_59CE_41E3_55F3A44C2A91",
   "pitch": -27.76,
   "yaw": 12.22,
   "distance": 100
  }
 ],
 "id": "overlay_C22FBB85_D6B4_493E_41E3_F5949EDD00D8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_F17DEF66_D65C_4DCB_41B6_7F691D7212D5); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 5.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -167.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -20.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.74,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F33DBF46_D657_CDCB_41EA_2EBD28D9E6F1",
   "pitch": -20.91,
   "yaw": -167.6,
   "distance": 100
  }
 ],
 "id": "overlay_CE13689F_D654_5379_41D1_55F93BCF0F29",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9, this.camera_F59B7980_D65C_7547_41D0_4AE656BF540D); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -69.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -43.92
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD09A293_BDE2_CE0A_41D1_5C36A9544420",
   "pitch": -43.92,
   "yaw": -69.85,
   "distance": 100
  }
 ],
 "id": "overlay_A79FC131_B3BD_DE1D_41CB_6D0DB5D6FBA8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_F5979971_D65C_75C9_41BF_7775D016949B); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 9.3,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 19
     }
    ]
   },
   "pitch": -8.96
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 311,
      "height": 378
     }
    ]
   },
   "pitch": -8.96,
   "yaw": -78.74
  }
 ],
 "id": "overlay_A6640D08_B3BC_260B_41DC_5121CDCA6EA7",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A, this.camera_C8FC914E_D65C_55DB_41A5_4EC514B40F8F); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -36.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E6677D_D6DC_59CE_41BE_1043AF0B7DC2",
   "pitch": -36.9,
   "yaw": 153.72,
   "distance": 100
  }
 ],
 "id": "overlay_A7E706F3_B294_621D_41E5_19D2605D803E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34, this.camera_C8C7D15C_D65C_55FF_41D0_77F8362F6FAF); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -38.63
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.21,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD38D28A_BDE2_CE1A_41C4_8427A791ABBC",
   "pitch": -38.63,
   "yaw": 73.73,
   "distance": 100
  }
 ],
 "id": "overlay_A7515888_B294_2E0B_41E6_514DE0AF929D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_C8D1B184_D65C_554F_41D8_9F37D4B8F4AA); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04b"
 },
 "maps": [
  {
   "hfov": 12.98,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -109.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -33.41
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.98,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E6F77D_D6DC_59CE_41E6_C74726F7104B",
   "pitch": -33.41,
   "yaw": -109.69,
   "distance": 100
  }
 ],
 "id": "overlay_C126E2AC_D6BC_7B4E_41E5_088C3EDAC1EB",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_C8CFC16B_D65C_55D9_41E8_3006CB338052); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 8.14,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -19.03
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C3BB1740_D6FC_5DC7_41E4_7547BBAB2212",
   "pitch": -19.03,
   "yaw": -111.63,
   "distance": 100
  }
 ],
 "id": "overlay_C06E9E5F_D6EC_4FF9_41D4_B8CF92DE5379",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_F1F59EE1_D65C_4CC9_41BE_0525A7D1C931); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 14.52
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 255,
      "height": 255
     }
    ]
   },
   "pitch": 14.52,
   "yaw": -143.52
  }
 ],
 "id": "overlay_A116EB46_B29C_6207_41E0_442B55E89DA4",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_F1934EC3_D65C_4CC9_41E3_5BD3063F07B4); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03a"
 },
 "maps": [
  {
   "hfov": 10.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -49.12
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.01,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C1DB061F_D65C_3B4A_41E3_E3ABFB0BC1EF",
   "pitch": -49.12,
   "yaw": -113.65,
   "distance": 100
  }
 ],
 "id": "overlay_A6EC268E_B29C_2207_41DB_EF3BE4C5AF26",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF619F2_B294_2E1F_41E2_371766686094, this.camera_C8B010A6_D65C_534B_41C2_531E7A4FBC24); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -33.7
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.7,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6FC4CC_D65C_3CDF_41E4_AAED80490417",
   "pitch": -33.7,
   "yaw": -62.44,
   "distance": 100
  }
 ],
 "id": "overlay_A623A739_B37C_620D_41BA_EC1F16031DAE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3, this.camera_F0F69DDC_D65C_4CFF_41CB_8BC2E7171F7D); this.mainPlayList.set('selectedIndex', 51)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 05"
 },
 "maps": [
  {
   "hfov": 10.76,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.71
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.76,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_ACE802AA_BDE2_CE1A_41D4_75958B53831E",
   "pitch": 0.71,
   "yaw": -60.76,
   "distance": 100
  }
 ],
 "id": "overlay_A32203F1_B69C_10BD_41E6_675DD40D1DD6",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63, this.camera_F0E6EDCD_D65C_4CD9_41D0_9697D0F0897C); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 05"
 },
 "maps": [
  {
   "hfov": 9.27,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 107.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -15.05
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.27,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36D8F74_D657_CDCF_41EA_0C4EB74DD7C2",
   "pitch": -15.05,
   "yaw": 107.93,
   "distance": 100
  }
 ],
 "id": "overlay_CDCE8E5E_D66C_4FFB_41E8_16B55305009D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034, this.camera_F0F81DEC_D65C_4CDF_41A9_6F3E61CA4C09); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "maps": [
  {
   "hfov": 10.75,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -103.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 41,
      "height": 16
     }
    ]
   },
   "pitch": -12.44
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36D1F74_D657_CDCF_41CD_88AF44FDF18D",
   "pitch": -12.44,
   "yaw": -103.03,
   "distance": 50
  }
 ],
 "id": "overlay_CBBAB8CC_D654_D4DF_41CE_AD0615F302AE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_F01DAE4A_D65C_4FDB_41E3_E93BC04FB625); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -94.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -22.17
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F43618F0_D65C_74C7_41E6_F7895082BA1C",
   "pitch": -22.17,
   "yaw": -94.11,
   "distance": 100
  }
 ],
 "id": "overlay_A3E15370_B58C_11BC_41E6_4C27776DF80D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571, this.camera_F00D9E3B_D65C_4FB9_41E7_BC28B75775EC); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 12.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -22.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.02,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3635F6A_D657_CDDB_41E8_42EA78732253",
   "pitch": -22.04,
   "yaw": 18.97,
   "distance": 100
  }
 ],
 "id": "overlay_CB69F932_D67C_F54B_41E1_3D5D448D006E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917, this.camera_C8BA90B4_D65C_534F_41E6_CD2F9F565515); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 8.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -20.43
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F362AF6A_D657_CDDB_41CA_31C9293977D7",
   "pitch": -20.43,
   "yaw": -173.43,
   "distance": 100
  }
 ],
 "id": "overlay_A3BE4913_B58C_117D_41D2_272BE5657E02",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273, this.camera_C884B0C2_D65C_54CB_41C8_61E7D0BF57DA); this.mainPlayList.set('selectedIndex', 43)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 9.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -17.98
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3622F6B_D657_CDD9_41C8_66D4B58ED049",
   "pitch": -17.98,
   "yaw": 4.41,
   "distance": 100
  }
 ],
 "id": "overlay_AC6CF670_B58C_13BB_41E5_7D3E6F2E0DCC",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_F687D3B7_D65C_5549_41E6_2C570B87064C); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -31.56
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E5277D_D6DC_59CE_41D0_CA94993CDE02",
   "pitch": -31.56,
   "yaw": -86.71,
   "distance": 100
  }
 ],
 "id": "overlay_A6A7899D_B28C_2E05_41E4_2CD66509294C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A, this.camera_FE8E9FAE_D65C_4D5B_41C8_34867CBD0F85); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.96,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 100.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -49.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0B989EE_D6EC_D4DB_41E7_F0847FFC8443",
   "pitch": -49.77,
   "yaw": 100.94,
   "distance": 100
  }
 ],
 "id": "overlay_C0B5F3E0_D6EC_34C7_41DC_538232F5D8A9",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_FE90CFBC_D65C_4CBF_41DA_CB6D6200B20E); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -48.61
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0B819EE_D6EC_D4DB_41E2_8AC4FE01A6D8",
   "pitch": -48.61,
   "yaw": -88.35,
   "distance": 100
  }
 ],
 "id": "overlay_C09B408E_D6ED_D35B_41E9_AFD59FBEC726",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C, this.camera_F1D73EFC_D65C_4CBF_41D6_6B5438F3C782); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 8.05,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 42.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -9.31
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 269,
      "height": 297
     }
    ]
   },
   "pitch": -9.31,
   "yaw": 42.93
  }
 ],
 "id": "overlay_AC08694A_B68C_31EF_41AF_C3038D9E6E8C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63, this.camera_F126BF0A_D65C_4D5B_41C2_785FC5B5F2C6); this.mainPlayList.set('selectedIndex', 49)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -10.73
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36B8F72_D657_CDCB_41A4_B5FFB4EC5DC7",
   "pitch": -10.73,
   "yaw": -114.36,
   "distance": 100
  }
 ],
 "id": "overlay_CB0AEB02_D675_D54B_41AF_7187873FB270",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF6218B_B295_FE0D_41CD_547A369C9034, this.camera_F1368F1F_D65C_4D79_41CC_278E535854DF); this.mainPlayList.set('selectedIndex', 52)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 10.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 122.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -19.62
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F43EE8F6_D65C_74CB_41BD_F8DC884E9324",
   "pitch": -19.62,
   "yaw": 122.54,
   "distance": 100
  }
 ],
 "id": "overlay_CB8004A8_D65C_D347_41E2_EA8735985B8C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_C9F8E2D8_D65C_54C7_41E8_03790D31AB7F); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 17.8,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 62.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -11.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 600,
      "height": 600
     }
    ]
   },
   "pitch": -11.22,
   "yaw": 62.81
  }
 ],
 "id": "overlay_A15A77A4_B28C_223B_41D4_961EBEF9520D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7, this.camera_C9D5D2F2_D65C_54CB_41DF_C2AFEF7F2858); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.46,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -29.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -35.58
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.46,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E4577E_D6DC_59CA_41D8_94EA25B2449E",
   "pitch": -35.58,
   "yaw": -29.22,
   "distance": 100
  }
 ],
 "id": "overlay_A1426398_B28C_220B_41CF_5CB6C0F48471",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.66,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -24.41
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E4877E_D6DC_59CA_41D7_A8029DEC3423",
   "pitch": -24.41,
   "yaw": -67.63,
   "distance": 100
  }
 ],
 "id": "overlay_A1539037_B2F3_FE05_41D2_2E8B1531C992",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_F30CDD27_D65C_4D49_41EA_A63BFBC805D8); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 15.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 15
     }
    ]
   },
   "pitch": -7.1
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.31,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 509,
      "height": 509
     }
    ]
   },
   "pitch": -7.1,
   "yaw": -131.14
  }
 ],
 "id": "overlay_A11965BD_B2FC_660A_41B5_37919A2C967C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED, this.camera_F33C3D13_D65C_4D49_41E0_471190C6DCBE); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 07b"
 },
 "maps": [
  {
   "hfov": 16.87,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 48.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -47.16
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.87,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E15781_D6DC_5937_41C7_644DC659CE0D",
   "pitch": -47.16,
   "yaw": 48.26,
   "distance": 100
  }
 ],
 "id": "overlay_C2C9EF08_D6D7_C936_41DE_D01468CB53A3",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_FEBEEF9F_D65C_4D79_41E7_646E004881B0); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 02b"
 },
 "maps": [
  {
   "hfov": 5.41,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -43.75
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD30028F_BDE2_CE1A_41D3_F0EBA04E6F89",
   "pitch": -43.75,
   "yaw": 0.05,
   "distance": 100
  }
 ],
 "id": "overlay_A6CDE92C_B28C_2E0A_4194_F30F37CAF4C8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_F15F6F82_D65C_4D48_41CB_984C5096DF15); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 11.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -23.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 13.17
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0BD59EB_D6EC_D4D9_419F_F5340A89E570",
   "pitch": 13.17,
   "yaw": -23.44,
   "distance": 100
  }
 ],
 "id": "overlay_C08E5C4F_D6F4_F3D9_41E3_7BAA9E0DFB96",
 "enabledInCardboard": true
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button settings VR"
 },
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "width": 60,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "fontFamily": "Arial",
 "iconHeight": 30,
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "shadowBlurRadius": 6,
 "pressedRollOverIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "height": 60,
 "backgroundOpacity": 1,
 "mode": "push",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 12,
 "borderColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "iconWidth": 30,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings Gyro"
 },
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "width": 60,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "iconHeight": 30,
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "shadowBlurRadius": 6,
 "pressedRollOverIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "height": 60,
 "backgroundOpacity": 1,
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "mode": "toggle",
 "rollOverIconWidth": 30,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "rollOverIconHeight": 30,
 "shadow": false,
 "iconWidth": 30,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings HS"
 },
 "id": "Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "width": 60,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "iconHeight": 30,
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "shadowBlurRadius": 6,
 "pressedRollOverIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "height": 60,
 "backgroundOpacity": 1,
 "pressedIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed.png",
 "mode": "toggle",
 "rollOverIconWidth": 30,
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "pressedRollOverBackgroundColor": [
  "#CE6700"
 ],
 "fontSize": 12,
 "borderColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA.png",
 "paddingBottom": 0,
 "rollOverIconHeight": 30,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "iconWidth": 30,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_C89E90FB_D65C_54B8_41DF_753B63DA4C2A); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -21.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3613F68_D657_CDC7_41B1_932BA39BF3E8",
   "pitch": -21.85,
   "yaw": -159.86,
   "distance": 100
  }
 ],
 "id": "overlay_A3B03E31_B594_13BD_41D3_974DC13A7193",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06c"
 },
 "maps": [
  {
   "hfov": 4.99,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -168.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -14.08
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.99,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1E22A2_BDE2_CE0A_418C_79A7A6A15941",
   "pitch": -14.08,
   "yaw": -168.47,
   "distance": 100
  }
 ],
 "id": "overlay_A386E8BA_B594_70AC_41E4_A461BFCF4CD8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_C89770EB_D65C_54D8_41E1_C6F334810FF3); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -10.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.18,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3605F69_D657_CDD9_41D6_A31AC33FD823",
   "pitch": -10.8,
   "yaw": 18.05,
   "distance": 100
  }
 ],
 "id": "overlay_A39912AD_B594_10A5_41DC_4C47E8D4EB26",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E, this.camera_C8514255_D65C_57C9_41CB_C39B1D379FA5); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.68,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -60.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -11.48
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.68,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD208285_BDE2_CE0E_41CF_42EF013EA29E",
   "pitch": -11.48,
   "yaw": -60.71,
   "distance": 100
  }
 ],
 "id": "overlay_A6A05E9E_B294_2206_4198_456CF856B339",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_C9ABB26F_D65C_57D9_41E6_13D00F268124); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -19.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.6,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C1DF861D_D65C_3B4E_41E2_A41974796BA7",
   "pitch": -19.77,
   "yaw": 91.56,
   "distance": 100
  }
 ],
 "id": "overlay_A4C571CE_B294_7E07_41D1_47E11FFE9D44",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708, this.camera_C9876289_D65C_5759_41D4_DE9E0D7F3789); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.04,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 48.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -14.96
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.04,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C1DFF61D_D65C_3B4E_41D8_8BF0996ECB58",
   "pitch": -14.96,
   "yaw": 48.7,
   "distance": 100
  }
 ],
 "id": "overlay_A10D4886_B294_6E07_41A8_FDEB9B15FA4E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943, this.camera_C842F23A_D65C_57BB_41C8_8FD8128D7863); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.33
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0_HS_3_0.png",
      "class": "ImageResourceLevel",
      "width": 255,
      "height": 255
     }
    ]
   },
   "pitch": -8.33,
   "yaw": -0.59
  }
 ],
 "id": "overlay_A4A048F5_B6CB_63D7_41E2_CADAF7431EB9",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62, this.camera_F5F3399E_D65C_757B_41D2_6F5701710A63); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.38,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -35.06
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.38,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E4D77E_D6DC_59CB_41E8_33D2C0DFBAB6",
   "pitch": -35.06,
   "yaw": -30.06,
   "distance": 100
  }
 ],
 "id": "overlay_A6F613F2_B2F4_221F_41C4_11EC6A5D6BC3",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28, this.camera_F5EE598E_D65C_755B_4190_F17E65C91A88); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -34.32
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3C728C_BDE2_CE1E_41B5_919F2A837FFB",
   "pitch": -34.32,
   "yaw": -133.62,
   "distance": 100
  }
 ],
 "id": "overlay_A66E538A_B2F4_E20F_41BD_C6E949D03F29",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C, this.camera_C83291C0_D65C_54C7_41D6_47780809B9CC); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -116.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -15.38
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD15F2A7_BDE2_CE0A_41E4_7DDFC11F80C7",
   "pitch": -15.38,
   "yaw": -116.43,
   "distance": 100
  }
 ],
 "id": "overlay_A355CF73_B574_11BD_41E0_5D4FB1E55AEB",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE2538F_B294_E206_41DB_F1184638A5E0, this.camera_C82B61AF_D65C_5559_41E4_B0E12174894B); this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 4.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -8.95
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1472A7_BDE2_CE0A_41C7_37F64742BF16",
   "pitch": -8.95,
   "yaw": -113.28,
   "distance": 100
  }
 ],
 "id": "overlay_ACD895B7_B574_10A5_41C0_121645A3CBB6",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C, this.camera_C82301A0_D65C_5547_41D6_9CA3A4601062); this.mainPlayList.set('selectedIndex', 47)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.69,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -24.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -8.67
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3698F70_D657_CDC7_41C7_252229B22316",
   "pitch": -8.67,
   "yaw": -24.28,
   "distance": 100
  }
 ],
 "id": "overlay_CD3B7998_D674_5547_41E4_51BDAE0B198F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7, this.camera_F1835EB5_D65C_4F49_41D2_7B6C2EC7CCD6); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -39.1
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C3B89742_D6FC_5DCB_41E5_778AEA94280F",
   "pitch": -39.1,
   "yaw": -162.63,
   "distance": 100
  }
 ],
 "id": "overlay_A6C644CF_B2F5_E605_41C2_03F4FA4A3D05",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 6.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -136.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -6.02
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.01,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 199,
      "height": 199
     }
    ]
   },
   "pitch": -6.02,
   "yaw": -136.2
  }
 ],
 "id": "overlay_A11C2CBC_B2F4_660B_41C3_9754038D0D88",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 10,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 17,
      "height": 16
     }
    ]
   },
   "pitch": -7.6
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 333,
      "height": 309
     }
    ]
   },
   "pitch": -7.6,
   "yaw": -120.25
  }
 ],
 "id": "overlay_A900D003_B6F4_E233_41E0_F870378D67EA",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430, this.camera_C8983109_D65C_5558_41B8_374F826BEFE3); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 07b"
 },
 "maps": [
  {
   "hfov": 16.4,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -46.99
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E1D781_D6DC_5937_418C_23719D2CD66C",
   "pitch": -46.99,
   "yaw": -120.62,
   "distance": 100
  }
 ],
 "id": "overlay_C22ED95E_D6D4_49CA_41E0_F24E9C26000C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_F5645A52_D65C_77CB_41E2_B15AB65B459D); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 15.33,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -109.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 15,
      "height": 15
     }
    ]
   },
   "pitch": -6.2
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 509,
      "height": 509
     }
    ]
   },
   "pitch": -6.2,
   "yaw": -109.13
  }
 ],
 "id": "overlay_A6E4DD05_B294_6605_41E2_C92C885527A9",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3EF0B_B294_220E_41BC_895572243E28, this.camera_F5693A6B_D65C_77D9_41DD_64E02349620E); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 79.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -51.22
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.37,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E7877C_D6DC_59CE_41B3_106DFA1D0B00",
   "pitch": -51.22,
   "yaw": 79.88,
   "distance": 100
  }
 ],
 "id": "overlay_A63AE262_B294_223F_41E4_134E4A27BD52",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7C56D_B294_2605_41E3_B770BFE12688, this.camera_F07FCE67_D65C_4FC8_41E3_5B63DAD388BE); this.mainPlayList.set('selectedIndex', 48)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 6.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 18
     }
    ]
   },
   "pitch": -9.42
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_1_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 203,
      "height": 229
     }
    ]
   },
   "pitch": -9.42,
   "yaw": -170.83
  }
 ],
 "id": "overlay_A327DE79_B68C_33AD_4193_D0A50D92FF3D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_F06FCE5A_D65C_4FFB_41E7_A245B639F3CA); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.11,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -56.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -6.57
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3688F71_D657_CDC9_41E2_7EBB6425F650",
   "pitch": -6.57,
   "yaw": -56.55,
   "distance": 100
  }
 ],
 "id": "overlay_CA99BA42_D674_37CB_41E7_8235203302FE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F, this.camera_C93B3329_D65C_5559_41D7_BE143CE2F2F6); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -35.69
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.71,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3F728C_BDE2_CE1E_418C_A44DB0980762",
   "pitch": -35.69,
   "yaw": -85.39,
   "distance": 100
  }
 ],
 "id": "overlay_A12EA653_B2FC_221E_41C2_244655C0F12F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430, this.camera_C912F342_D65C_55C8_41E7_178D52876897); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -48.19
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E2077F_D6DC_59CA_41E5_BE44F4EF6356",
   "pitch": -48.19,
   "yaw": -3.11,
   "distance": 100
  }
 ],
 "id": "overlay_C584AB59_D6D4_49D6_41E2_4926261DF51C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39, this.camera_C918C350_D65C_55C8_41B1_93CD3AD5B9C8); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 20.62,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -40.27
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.62,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E2477F_D6DC_59CA_41DA_6EA4A916AFFC",
   "pitch": -40.27,
   "yaw": 81.75,
   "distance": 100
  }
 ],
 "id": "overlay_C5B5E56A_D6D4_59CA_41E7_5B3EDE119AF5",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E, this.camera_C96C235D_D65C_55F9_41E7_35EA0C8FEE87); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "maps": [
  {
   "hfov": 10.16,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 83.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -20.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E2F77F_D6DC_59CA_41E5_C3C597401FDD",
   "pitch": -20.88,
   "yaw": 83.55,
   "distance": 100
  }
 ],
 "id": "overlay_C215FB75_D6DC_49DF_41C8_65485FB4B034",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918, this.camera_C935F31B_D65C_5579_41BC_0E7CBAF8BC55); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 9,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -18.25
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4D4A8D5_D65C_74C9_41E1_D1498595903E",
   "pitch": -18.25,
   "yaw": -85.66,
   "distance": 100
  }
 ],
 "id": "overlay_CBA72890_D655_D347_41B7_8B21F512E37C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E, this.camera_F580E964_D65C_75CF_41E9_21952A9FBBF7); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.93,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 52.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -37.4
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD30128E_BDE2_CE1A_41E1_6A64D3AB5A05",
   "pitch": -37.4,
   "yaw": 52.42,
   "distance": 100
  }
 ],
 "id": "overlay_A6EB9B77_B2FC_2205_41E0_A090AA0C43CD",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_F5BD6956_D65C_75CB_41E9_28FF51647619); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 20.18,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -127.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -41.43
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.18,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E07782_D6DC_5935_419E_0C65A3265DF5",
   "pitch": -41.43,
   "yaw": -127.88,
   "distance": 100
  }
 ],
 "id": "overlay_C07B77C1_D6D4_5936_41DB_D5520517D5B9",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFFC460_B294_263B_41D2_812D9082F47A, this.camera_F3997C94_D65C_734F_41C2_5F3B39A24B36); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.65,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -46.69
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.65,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD396289_BDE2_CE06_41E1_F2086A1C1618",
   "pitch": -46.69,
   "yaw": -67.45,
   "distance": 100
  }
 ],
 "id": "overlay_A151E8BA_B294_EE0C_41D7_D78A106E34D6",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -73.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.87
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_0_HS_1_0.png",
      "class": "ImageResourceLevel",
      "width": 254,
      "height": 254
     }
    ]
   },
   "pitch": -2.87,
   "yaw": -73.3
  }
 ],
 "id": "overlay_A1330E00_B2F4_65FB_41DB_A2656859E799",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34, this.camera_C8E5C117_D65C_5549_41B2_E2BD73E25A19); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.53,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 40.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -33.27
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.53,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3A528A_BDE2_CE1A_41D4_16EB6D72CBB5",
   "pitch": -33.27,
   "yaw": 40.71,
   "distance": 100
  }
 ],
 "id": "overlay_A16BEE30_B28C_621A_41B4_A0885BB8C271",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Left-Up"
 },
 "maps": [
  {
   "hfov": 9.54,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -20.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.54,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD3A228B_BDE2_CE1A_41D0_60C70DBAFFA9",
   "pitch": -20.88,
   "yaw": 12,
   "distance": 50
  }
 ],
 "id": "overlay_ACA27E65_B6FC_DEF7_41E6_D85BF0C0F9B7",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2CAB8_B294_220B_41DF_773112C84D39, this.camera_F2A7DAC1_D65C_74C9_41E9_5B1C6D1C972F); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.31,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -36.49
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.31,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E09782_D6DC_5935_41D7_C9B1E7AA673F",
   "pitch": -36.49,
   "yaw": -104.7,
   "distance": 100
  }
 ],
 "id": "overlay_A69FC48F_B2F4_2605_41B7_882B095D5499",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26, this.camera_F2B78AD4_D65C_74CF_41E2_C7979EBB660F); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 8.44,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -106.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -21.52
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E0D782_D6DC_5935_41D4_469FCF74BAA7",
   "pitch": -21.52,
   "yaw": -106.38,
   "distance": 100
  }
 ],
 "id": "overlay_A6C350C4_B2F4_7E7B_41D9_ED8FC1575B96",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40, this.camera_F540DA98_D65C_7747_41E0_C5D87AD59EA3); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 21.63,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 112.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -36.93
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.63,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD67B4C1_D65C_3CC9_41DF_42E8FCBD22DE",
   "pitch": -36.93,
   "yaw": 112.3,
   "distance": 100
  }
 ],
 "id": "overlay_A66EEB8F_B3B4_2206_41D9_B472B986BFC2",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF96CD_B297_E205_41BC_EC93C658E758, this.camera_F5570AAE_D65C_775B_41E2_763F183EBDEE); this.mainPlayList.set('selectedIndex', 28)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.02,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -24.33
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.02,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6714C1_D65C_3CC9_41DA_6517331ACC12",
   "pitch": -24.33,
   "yaw": 33.23,
   "distance": 100
  }
 ],
 "id": "overlay_CE21D90F_D6DF_F559_41BE_157772919862",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_F57CEA80_D65C_7747_41B1_B4906D0B1D56); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04b"
 },
 "maps": [
  {
   "hfov": 17.37,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -149.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -34.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.37,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6494C1_D65C_3CC9_41E8_BBD8F6049317",
   "pitch": -34.72,
   "yaw": -149.95,
   "distance": 100
  }
 ],
 "id": "overlay_C1423D89_D6DD_CD59_41DA_4F77B38144D7",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40, this.camera_F50A9A23_D65C_7749_41E9_C62BF8C4A7D4); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -38.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.74,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C2E5677D_D6DC_59CE_41D1_8F831CD961FE",
   "pitch": -38.8,
   "yaw": -96.87,
   "distance": 100
  }
 ],
 "id": "overlay_A15EDDED_B28F_E605_41E3_95E1B137D21C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B, this.camera_F5101A3B_D65C_77B9_41E7_30D5BCD12C6E); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 101.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -37.38
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C3BBA740_D6FC_5DC7_41EA_8321075B01B4",
   "pitch": -37.38,
   "yaw": 101.4,
   "distance": 100
  }
 ],
 "id": "overlay_A6361CB7_B28C_2605_41D8_2365410F49EF",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_F23E4BB4_D65C_754F_41DF_FA46CECCFAA9); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.07,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 41.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -26.16
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.07,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6F54CC_D65C_3CDF_41D0_756441293E6E",
   "pitch": -26.16,
   "yaw": 41.66,
   "distance": 100
  }
 ],
 "id": "overlay_A581B76C_B294_220B_41E2_C3CF23E91DAD",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 5.45,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 41.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -12.11
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6CB4CE_D65C_3CDB_41EA_97AC44AC5216",
   "pitch": -12.11,
   "yaw": 41.5,
   "distance": 100
  }
 ],
 "id": "overlay_A5FBFFD5_B294_2205_41D6_BBFDC66D6532",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFCE91F_B294_6E06_41E4_BEB998639147, this.camera_F2005BC8_D65C_74C7_41D4_99EF5567FE58); this.mainPlayList.set('selectedIndex', 35)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.26,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -29.44
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6C34CE_D65C_3CDB_41E1_9A7E23409B26",
   "pitch": -29.44,
   "yaw": -143.72,
   "distance": 100
  }
 ],
 "id": "overlay_A591AD1C_B29C_260B_41E5_1609317911D1",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Left"
 },
 "maps": [
  {
   "hfov": 6.86,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 44,
      "height": 16
     }
    ]
   },
   "pitch": -24.75
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.86,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6DC4CF_D65C_3CD9_41C9_B6268FF52348",
   "pitch": -24.75,
   "yaw": 25.71,
   "distance": 50
  }
 ],
 "id": "overlay_C1A844C6_D6B4_FCCB_41E9_2FC61649F7CC",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF2A352_B294_621F_41E3_5375F364F10B, this.camera_F22F8B9B_D65C_7579_41D0_36629910BDA7); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 6.74,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 59.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -16.58
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.74,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6D34CF_D65C_3CD9_41E1_68565F040B04",
   "pitch": -16.58,
   "yaw": 59.79,
   "distance": 100
  }
 ],
 "id": "overlay_CE2ED096_D6AB_F34B_41E1_7E4DC51E8C9E",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_F211ABDB_D65C_74F9_41D0_61BC264DDBED); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.56,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 166.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_8_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -30.37
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.56,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6A94CF_D65C_3CD9_41DA_34B352BC8EA2",
   "pitch": -30.37,
   "yaw": 166.89,
   "distance": 100
  }
 ],
 "id": "overlay_CEE39197_D6AF_D549_41C8_721A003956EE",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4, this.camera_F3F8ACC0_D65C_4CC7_41E0_134CCBB9982D); this.mainPlayList.set('selectedIndex', 36)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 15.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -27.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -28.34
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6A04D0_D65C_3CC7_41BA_7A9391B8D1A2",
   "pitch": -28.34,
   "yaw": -27.47,
   "distance": 100
  }
 ],
 "id": "overlay_A3F57B2F_B58C_31A5_41B1_C3B0D323E499",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF67E95_B294_6205_41E6_4008DC577345, this.camera_F3E88CAC_D65C_735F_41E8_7884ACA4FBEF); this.mainPlayList.set('selectedIndex', 34)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 14.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 59.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -28.52
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.06,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6B94D0_D65C_3CC7_41E8_D502E5AA6525",
   "pitch": -28.52,
   "yaw": 59.21,
   "distance": 100
  }
 ],
 "id": "overlay_A3ACC614_B58C_137B_41E1_232DBC95532F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Left"
 },
 "maps": [
  {
   "hfov": 4.09,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 54.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 51,
      "height": 16
     }
    ]
   },
   "pitch": -13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6BF4D0_D65C_3CC7_41D8_9C0A2C14C8AA",
   "pitch": -13.76,
   "yaw": 54.62,
   "distance": 50
  }
 ],
 "id": "overlay_A3FB9C62_B58C_17DF_41B2_2D2AE041D46F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 4.58,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 63.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -9.18
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.58,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6B74D0_D65C_3CC7_41E5_36C7ECF45FEF",
   "pitch": -9.18,
   "yaw": 63.35,
   "distance": 100
  }
 ],
 "id": "overlay_A3DD8EFE_B58C_70A7_41B4_362FA234601A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE37E62_B294_223E_41D5_683710308D0B, this.camera_F3DAECE7_D65C_4CC9_41E5_B02213FA746F); this.mainPlayList.set('selectedIndex', 37)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 10.47,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 125.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -33.84
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6814D1_D65C_3CC9_41A6_3D1208D82953",
   "pitch": -33.84,
   "yaw": 125.87,
   "distance": 100
  }
 ],
 "id": "overlay_A3D22D14_B594_117B_41E6_760EE19E43F8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_F32C3CFF_D65C_4CB9_41DA_219A78ADD24A); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 13.06,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -81.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 17
     }
    ]
   },
   "pitch": -5.69
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_1_HS_6_0.png",
      "class": "ImageResourceLevel",
      "width": 434,
      "height": 476
     }
    ]
   },
   "pitch": -5.69,
   "yaw": -81.16
  }
 ],
 "id": "overlay_8B6BE10B_B75C_E233_41D1_BA093F4471F8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_F3CACCD4_D65C_4CCF_4198_887E4626BBBD); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 6.57,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 61.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_7_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -14.44
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD69F4D1_D65C_3CC9_41E3_4B60CD2E8B14",
   "pitch": -14.44,
   "yaw": 61.46,
   "distance": 100
  }
 ],
 "id": "overlay_CE1A804C_D6AC_33DF_41C7_F932BE4726B8",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA, this.camera_FEE09FCC_D65C_4CDF_41E4_505D3F99B6E1); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a Left"
 },
 "maps": [
  {
   "hfov": 17.72,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 120.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 24,
      "height": 16
     }
    ]
   },
   "pitch": -49.02
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.72,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CD6214C3_D65C_3CC9_41E6_BD51A34316D7",
   "pitch": -49.02,
   "yaw": 120.64,
   "distance": 50
  }
 ],
 "id": "overlay_CF666E7B_D6AC_4FB9_41E9_DC44F6D33A39",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE8535C_B294_220B_419C_97E4DBF51571, this.camera_C9D81300_D65C_5547_41AC_200C74B36C84); this.mainPlayList.set('selectedIndex', 42)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "hfov": 10.71,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 53.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -16.48
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.71,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F365BF6C_D657_CDDF_41D2_4B83ADFDC186",
   "pitch": -16.48,
   "yaw": 53.93,
   "distance": 100
  }
 ],
 "id": "overlay_ACAA9B16_B58C_3164_41D1_D1A4B60E77C1",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D, this.camera_C92E830D_D65C_5559_41E0_A2B2936DB983); this.mainPlayList.set('selectedIndex', 44)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 22.77,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -175.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -30.47
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F3653F6C_D657_CDDF_41E1_DE7B3A28029A",
   "pitch": -30.47,
   "yaw": -175.53,
   "distance": 100
  }
 ],
 "id": "overlay_A3AFA20C_B58C_136B_41DF_2BF4D20F8B28",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 45)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b"
 },
 "maps": [
  {
   "hfov": 5.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 136.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -19.03
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1292A5_BDE2_CE0E_41B7_E241275F14B6",
   "pitch": -19.03,
   "yaw": 136.79,
   "distance": 100
  }
 ],
 "id": "overlay_F9256439_B777_625C_41E6_18134498E027",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_C970C36B_D65C_55D9_41E9_54D5FFA417A3); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.61,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -17.06
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C1DCD61E_D65C_3B4A_41D9_36F08F368204",
   "pitch": -17.06,
   "yaw": 6.64,
   "distance": 100
  }
 ],
 "id": "overlay_A1102A1B_B294_620E_41C6_0AFD68920E5F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E, this.camera_C94B4385_D65C_5549_41D0_868D6E72E817); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c"
 },
 "maps": [
  {
   "hfov": 10.24,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 22.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -6.51
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.24,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C1DD661E_D65C_3B4A_41D0_D7FA48E3E68F",
   "pitch": -6.51,
   "yaw": 22.3,
   "distance": 100
  }
 ],
 "id": "overlay_C6356495_D675_FF5E_41CE_ED3417E69834",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCE199F0_B294_2E1B_41D1_E919D0034708, this.camera_F6AE939F_D65C_5579_41E0_6AFBB588090B); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03a"
 },
 "maps": [
  {
   "hfov": 20.7,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 28,
      "height": 16
     }
    ]
   },
   "pitch": -27.73
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.7,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_CF5AD6B0_D6AC_3B56_41E0_D69D5CADAF36",
   "pitch": -27.73,
   "yaw": 90.59,
   "distance": 100
  }
 ],
 "id": "overlay_C226A2EA_D654_78CA_41C2_D9D191D4BC9A",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4, this.camera_F31E1D3B_D65C_4DB9_41EA_2D75B60C113B); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.34,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -17.34
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.34,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C0D95842_D654_773A_41E1_A1209170CB30",
   "pitch": -17.34,
   "yaw": -2.05,
   "distance": 100
  }
 ],
 "id": "overlay_A1D575FB_B294_660D_41E6_37913D75622D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF835AF_B294_2606_41BE_1C6360089D8D, this.camera_F371ED67_D65C_4DC9_41E3_6D042ABB2F8C); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.01,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 48.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -11.62
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.01,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_C1DA561F_D65C_3B4A_41E4_F4E5D74BB75B",
   "pitch": -11.62,
   "yaw": 48.98,
   "distance": 100
  }
 ],
 "id": "overlay_C6D54E66_D67C_4BFA_41E5_4940B76CE15D",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B, this.camera_C88A40DD_D65C_54F9_41C5_EB782645754E); this.mainPlayList.set('selectedIndex', 50)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 14.49,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -26.74
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F36C7F74_D657_CDC8_41DD_32036C85F117",
   "pitch": -26.74,
   "yaw": 168.13,
   "distance": 100
  }
 ],
 "id": "overlay_CCF7BE6F_D66C_4FD9_41AA_F2AC4D64E93C",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCEABDE6_B294_E607_41E1_88A4981F631C, this.camera_F03A4E2C_D65C_4F5F_41B6_2B2C266F4041); this.mainPlayList.set('selectedIndex', 40)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 19.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 39,
      "height": 16
     }
    ]
   },
   "pitch": -20.71
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AD1C02A1_BDE2_CE06_41E1_41CA0867DE01",
   "pitch": -20.71,
   "yaw": -5.69,
   "distance": 100
  }
 ],
 "id": "overlay_A3EC57E4_B594_10DB_41E4_457C674F15AD",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917, this.camera_F0D81E10_D65C_4F47_41DE_9C0D1ACA559C); this.mainPlayList.set('selectedIndex', 41)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 04"
 },
 "maps": [
  {
   "hfov": 24.19,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -104.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -8.73
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F31EBF67_D657_CDC9_41D6_D02131C93BA1",
   "pitch": -8.73,
   "yaw": -104.77,
   "distance": 100
  }
 ],
 "id": "overlay_CCEFB1B7_D674_5549_41D8_586F9E93083B",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC, this.camera_F0C84E00_D65C_4F47_41EA_6F6C74850B56); this.mainPlayList.set('selectedIndex', 46)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.67,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -5.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0_HS_5_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 61,
      "height": 16
     }
    ]
   },
   "pitch": -6.18
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F31E0F67_D657_CDC9_41E3_800FBEA12B83",
   "pitch": -6.18,
   "yaw": -5.53,
   "distance": 100
  }
 ],
 "id": "overlay_CCC7FC3B_D674_D3B9_41CF_0063EBC29D3F",
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7, this.camera_F02A4E1E_D65C_4F7B_41E3_260A7CE02F69); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "maps": [
  {
   "hfov": 11.21,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0_HS_6_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 29,
      "height": 16
     }
    ]
   },
   "pitch": -31.15
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.21,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F361BF68_D657_CDC7_41B3_C46FA22B5362",
   "pitch": -31.15,
   "yaw": 153.46,
   "distance": 50
  }
 ],
 "id": "overlay_CC99074D_D67C_DDD9_41B0_B9DE189FE9F6",
 "enabledInCardboard": true
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "text 1"
 },
 "id": "Label_0C5F13A8_3BA0_A6FF_41BD_E3D21CFCE151",
 "left": 0,
 "width": 239,
 "class": "Label",
 "textShadowColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "textShadowVerticalLength": 0,
 "paddingLeft": 0,
 "text": "360°",
 "horizontalAlign": "left",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": 5,
 "height": 67,
 "textShadowHorizontalLength": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 54,
 "textShadowBlurRadius": 10,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "textDecoration": "none",
 "shadow": false,
 "fontWeight": "bold",
 "textShadowOpacity": 1
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "text 2"
 },
 "id": "Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
 "left": 0,
 "width": 271,
 "class": "Label",
 "textShadowColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "textShadowVerticalLength": 0,
 "paddingLeft": 0,
 "text": "Casa 8 Condominio La Milla",
 "horizontalAlign": "left",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "textShadowBlurRadius": 10,
 "height": 31,
 "textShadowHorizontalLength": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 18,
 "bottom": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "textDecoration": "none",
 "shadow": false,
 "fontWeight": "normal",
 "textShadowOpacity": 1
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Label Company Name"
 },
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": 76,
 "width": 450,
 "class": "Label",
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "paddingLeft": 0,
 "text": "ΣΧ Studio",
 "horizontalAlign": "left",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "0%",
 "height": 60,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 31,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "fontStyle": "normal",
 "textDecoration": "none",
 "shadow": false,
 "fontWeight": "normal"
},
{
 "horizontalAlign": "center",
 "maxWidth": 50,
 "id": "Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
 "left": 10,
 "maxHeight": 50,
 "width": "100%",
 "class": "Image",
 "paddingRight": 0,
 "borderSize": 0,
 "url": "skin/Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "logo"
 },
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "width": 1199,
 "class": "Container",
 "horizontalAlign": "right",
 "right": "0%",
 "paddingRight": 15,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "0%",
 "height": 60,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "children": [
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "paddingBottom": 0,
 "data": {
  "name": "-button set container"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Info"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Thumblist"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0_rollover.png",
 "iconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0.png",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Location"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA_rollover.png",
 "iconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA.png",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B_rollover.png",
 "iconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B.png",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Floorplan"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Realtor"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 101,
 "id": "IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
 "maxHeight": 101,
 "width": 44,
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93_rollover.png",
 "iconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93.png",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton Video"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "class": "Container",
 "right": "15%",
 "paddingRight": 20,
 "horizontalAlign": "right",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "10%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "class": "Container",
 "right": "15%",
 "paddingRight": 20,
 "horizontalAlign": "right",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "10%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "shadowHorizontalLength": 0,
 "layout": "vertical",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "data": {
  "name": "Global"
 },
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "15%",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "contentOpaque": false,
 "top": "10%",
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "10%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "paddingBottom": 0,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "shadowHorizontalLength": 0,
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "15%",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "class": "Container",
 "right": "15%",
 "paddingRight": 20,
 "horizontalAlign": "right",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "10%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "80%",
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "vertical"
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36D6F75_D657_CDC9_41E6_45E888176C4D",
 "levels": [
  {
   "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36CCF76_D657_CDCB_41E2_FAFD26E07781",
 "levels": [
  {
   "url": "media/panorama_BCF6218B_B295_FE0D_41CD_547A369C9034_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD64F4C2_D65C_3CCB_41DA_5621D019E15C",
 "levels": [
  {
   "url": "media/panorama_BCF20CCE_B294_2606_41A7_E784DE8C1E40_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD7654D2_D65C_3CCB_41BB_915F39CF040E",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD77C4D2_D65C_3CCB_41E8_FFA8B633519A",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD74C4D3_D65C_3CC9_41E3_B4731D99E9E7",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD7434D3_D65C_3CF3_416B_B81C5AC8ABAE",
 "levels": [
  {
   "url": "media/panorama_BCE37E62_B294_223E_41D5_683710308D0B_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F366FF6E_D657_CDDB_41E3_20A28EEB4F39",
 "levels": [
  {
   "url": "media/panorama_BCEDA408_B294_660B_41D2_CCAFD434536C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6384C3_D65C_3CC9_41D7_1BB8EE78E0E0",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD63F4C4_D65C_3CCF_41CD_26E8730F289C",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 21
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6374C4_D65C_3CCF_41E0_9AACDA2171A1",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6014C4_D65C_3CCF_41B7_4636AD3EC375",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6074C4_D65C_3CCF_41E4_C55489820486",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD61D4C5_D65C_3CC9_41E8_D74BD2BA2BBD",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6164C5_D65C_3CC9_41E0_962AAB177D67",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6044C5_D65C_3CC9_41E6_872ED40CDABE",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_11_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD61A4CB_D65C_3CD9_41E5_C20AD3020D3D",
 "levels": [
  {
   "url": "media/panorama_BCFF0FBB_B294_220D_41B6_1C937BDFAFA7_0_HS_12_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3642F6D_D657_CDD9_41E4_5DB7E7BAE0CE",
 "levels": [
  {
   "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD12C2A6_BDE2_CE0A_41B3_70C7BCC951AF",
 "levels": [
  {
   "url": "media/panorama_BCF658EA_B294_2E0E_41E1_701FBB402D3D_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F31D3F65_D657_CDC9_41AE_01C32B395DE3",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1BA2A0_BDE2_CE06_41E3_3FB79B8F5367",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F31C5F66_D657_CDCB_41C4_6D9432FEF918",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1D32A1_BDE2_CE06_41E1_4DD344BC13D8",
 "levels": [
  {
   "url": "media/panorama_BCF6F889_B294_2E0D_41B4_0D3863625B6E_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6114CB_D65C_3CD9_41D2_5E142BF01E6A",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6EA4CC_D65C_3CDF_41DD_F18681C226EE",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD00C299_BDE2_CE06_41C3_30B43AB1590F",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6E54CC_D65C_3CDF_41CE_D9B9650989DB",
 "levels": [
  {
   "url": "media/panorama_BCF619F2_B294_2E1F_41E2_371766686094_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_ACE912A9_BDE2_CE06_41C3_246836C215B4",
 "levels": [
  {
   "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36A8F73_D657_CDC9_41A5_E6FEF8009D48",
 "levels": [
  {
   "url": "media/panorama_BCEF60B5_B294_3E05_41E0_F51CB0334B63_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5F24B7_D65C_3349_41E6_ADE5FAE9BE58",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0BC39EC_D6EC_D4DF_414E_1C502A2325A8",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5C34B7_D65C_3349_41D5_87948D642FD5",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5DB4B8_D65C_3347_41CB_5FFD09F99E28",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5D24B8_D65C_3347_41DD_B7462E4ACDED",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5D74B8_D65C_3347_41B9_53995D2FE492",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5A04B8_D65C_3347_41C5_3BAA9E40D498",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_10_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3090F51_D657_CDC9_41C5_DE52A4B320E2",
 "levels": [
  {
   "url": "media/panorama_BCFC1934_B294_6E1B_41DA_A5FD60B372CA_0_HS_11_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0BB89ED_D6EC_D4D9_41EA_5601A9C0118C",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0B939EE_D6EC_D4DB_41E4_16F0AD8A7618",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5B04BE_D65C_3CBB_41C9_143F908554FF",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5894BE_D65C_3CBB_41D8_B6B0C30D069B",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5804BF_D65C_3CB9_41E3_2ED265A9E183",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD5984BF_D65C_3CB9_41D4_AD3C05B3B694",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD59E4BF_D65C_3CB9_41E4_0166D2FD3A52",
 "levels": [
  {
   "url": "media/panorama_BCF2A352_B294_621F_41E3_5375F364F10B_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6464C2_D65C_3CCB_41DB_6B9B31F6B7E0",
 "levels": [
  {
   "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD65D4C2_D65C_3CCB_41E2_F90EAD7E9E6C",
 "levels": [
  {
   "url": "media/panorama_BCFF96CD_B297_E205_41BC_EC93C658E758_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 1110
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD27F287_BDE2_CE0A_41E3_F74EA0E34C83",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD261287_BDE2_CE0A_41D1_AE5E3051BDA8",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2D8A77B_D6DC_59CA_41E6_E68B35B6C765",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 1220,
   "height": 840
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C3BDE73E_D6FC_5DBB_41AC_0755C4177E6C",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F33ADF45_D657_CDC9_41E0_CF35AA4AE399",
 "levels": [
  {
   "url": "media/panorama_BCFF8FBC_B295_E204_41C3_188589AA1A9F_0_HS_9_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C3BE573B_D6FC_5DB9_41D7_A946E8914F2B",
 "levels": [
  {
   "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CC24C44F_D6FC_F3D9_41E7_73491006AAA8",
 "levels": [
  {
   "url": "media/panorama_BDA2F93E_B294_6E06_41E3_B51B09C5348E_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6964D2_D65C_3CCB_41E7_13B75D59A187",
 "levels": [
  {
   "url": "media/panorama_BCF61459_B294_260D_41C7_E0F0F87CC2C4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6544C2_D65C_3CCB_41E5_8181D82B338B",
 "levels": [
  {
   "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD62A4C3_D65C_3CC9_41DF_A43FC5658198",
 "levels": [
  {
   "url": "media/panorama_BCF600D5_B297_FE05_41D8_251627B380F4_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "frameCount": 21
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E7277C_D6DC_59CE_41DF_EA713D4542AF",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E7777C_D6DC_59CE_41E3_55F3A44C2A91",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F33DBF46_D657_CDCB_41EA_2EBD28D9E6F1",
 "levels": [
  {
   "url": "media/panorama_BCF3D9F3_B295_EE1D_41D2_D233F5B35918_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD09A293_BDE2_CE0A_41D1_5C36A9544420",
 "levels": [
  {
   "url": "media/panorama_BCF25788_B294_220A_41D1_4E5B48E22A2A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E6677D_D6DC_59CE_41BE_1043AF0B7DC2",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD38D28A_BDE2_CE1A_41C4_8427A791ABBC",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E6F77D_D6DC_59CE_41E6_C74726F7104B",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C3BB1740_D6FC_5DC7_41E4_7547BBAB2212",
 "levels": [
  {
   "url": "media/panorama_BCFB78C8_B294_2E0B_41C7_1C8AC8788A40_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1DB061F_D65C_3B4A_41E3_E3ABFB0BC1EF",
 "levels": [
  {
   "url": "media/panorama_BCF3D4E4_B295_E63B_41D3_93B0B6E11943_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6FC4CC_D65C_3CDF_41E4_AAED80490417",
 "levels": [
  {
   "url": "media/panorama_BCFC7428_B294_660B_41C8_C5A654CF5DD4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_ACE802AA_BDE2_CE1A_41D4_75958B53831E",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36D8F74_D657_CDCF_41EA_0C4EB74DD7C2",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36D1F74_D657_CDCF_41CD_88AF44FDF18D",
 "levels": [
  {
   "url": "media/panorama_BCF7CBA0_B294_223B_41CA_0E9854EF527B_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 300
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F43618F0_D65C_74C7_41E6_F7895082BA1C",
 "levels": [
  {
   "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3635F6A_D657_CDDB_41E8_42EA78732253",
 "levels": [
  {
   "url": "media/panorama_BCF638FD_B294_EE05_41E1_5893AA9BA917_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F362AF6A_D657_CDDB_41CA_31C9293977D7",
 "levels": [
  {
   "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3622F6B_D657_CDD9_41C8_66D4B58ED049",
 "levels": [
  {
   "url": "media/panorama_BCE8535C_B294_220B_419C_97E4DBF51571_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E5277D_D6DC_59CE_41D0_CA94993CDE02",
 "levels": [
  {
   "url": "media/panorama_BCF3A32F_B294_6205_41D8_F9DA5F56FF6A_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0B989EE_D6EC_D4DB_41E7_F0847FFC8443",
 "levels": [
  {
   "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0B819EE_D6EC_D4DB_41E2_8AC4FE01A6D8",
 "levels": [
  {
   "url": "media/panorama_BCE17D72_B294_661F_41E1_DBC1AE9C72C9_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36B8F72_D657_CDCB_41A4_B5FFB4EC5DC7",
 "levels": [
  {
   "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F43EE8F6_D65C_74CB_41BD_F8DC884E9324",
 "levels": [
  {
   "url": "media/panorama_BCF7C56D_B294_2605_41E3_B770BFE12688_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E4577E_D6DC_59CA_41D8_94EA25B2449E",
 "levels": [
  {
   "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E4877E_D6DC_59CA_41D7_A8029DEC3423",
 "levels": [
  {
   "url": "media/panorama_BCF26BCA_B294_220E_41E0_AD991AFB6F28_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E15781_D6DC_5937_41C7_644DC659CE0D",
 "levels": [
  {
   "url": "media/panorama_BCF2B585_B294_E6FA_41DC_AA97BA80F430_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD30028F_BDE2_CE1A_41D3_F0EBA04E6F89",
 "levels": [
  {
   "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0BD59EB_D6EC_D4D9_419F_F5340A89E570",
 "levels": [
  {
   "url": "media/panorama_BCF2CEE8_B294_220B_41D9_42ADB2F2619A_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3613F68_D657_CDC7_41B1_932BA39BF3E8",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1E22A2_BDE2_CE0A_418C_79A7A6A15941",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3605F69_D657_CDD9_41D6_A31AC33FD823",
 "levels": [
  {
   "url": "media/panorama_BCEABDE6_B294_E607_41E1_88A4981F631C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD208285_BDE2_CE0E_41CF_42EF013EA29E",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1DF861D_D65C_3B4E_41E2_A41974796BA7",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1DFF61D_D65C_3B4E_41D8_8BF0996ECB58",
 "levels": [
  {
   "url": "media/panorama_BCF835AF_B294_2606_41BE_1C6360089D8D_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E4D77E_D6DC_59CB_41E8_33D2C0DFBAB6",
 "levels": [
  {
   "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3C728C_BDE2_CE1E_41B5_919F2A837FFB",
 "levels": [
  {
   "url": "media/panorama_BCFB5640_B294_227B_41D1_52A5643FAFD7_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD15F2A7_BDE2_CE0A_41E4_7DDFC11F80C7",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1472A7_BDE2_CE0A_41C7_37F64742BF16",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3698F70_D657_CDC7_41C7_252229B22316",
 "levels": [
  {
   "url": "media/panorama_BCF61F30_B294_621B_41DD_76A6D9DC7DAC_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C3B89742_D6FC_5DCB_41E5_778AEA94280F",
 "levels": [
  {
   "url": "media/panorama_BCF2A0BA_B294_DE0F_41D5_36EBB303CE62_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E1D781_D6DC_5937_418C_23719D2CD66C",
 "levels": [
  {
   "url": "media/panorama_BCFC0055_B294_DE05_41C6_7E3E6849BAED_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E7877C_D6DC_59CE_41B3_106DFA1D0B00",
 "levels": [
  {
   "url": "media/panorama_BCFFC460_B294_263B_41D2_812D9082F47A_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3688F71_D657_CDC9_41E2_7EBB6425F650",
 "levels": [
  {
   "url": "media/panorama_BC13BA4C_B294_620B_41D6_D89C0AB0951C_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3F728C_BDE2_CE1E_418C_A44DB0980762",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E2077F_D6DC_59CA_41E5_BE44F4EF6356",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E2477F_D6DC_59CA_41DA_6EA4A916AFFC",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E2F77F_D6DC_59CA_41E5_C3C597401FDD",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F4D4A8D5_D65C_74C9_41E1_D1498595903E",
 "levels": [
  {
   "url": "media/panorama_BCFD1AC3_B294_E27D_41E6_4C7A551D4B26_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD30128E_BDE2_CE1A_41E1_6A64D3AB5A05",
 "levels": [
  {
   "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E07782_D6DC_5935_419E_0C65A3265DF5",
 "levels": [
  {
   "url": "media/panorama_BCF2CAB8_B294_220B_41DF_773112C84D39_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD396289_BDE2_CE06_41E1_F2086A1C1618",
 "levels": [
  {
   "url": "media/panorama_BCF3EF0B_B294_220E_41BC_895572243E28_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3A528A_BDE2_CE1A_41D4_16EB6D72CBB5",
 "levels": [
  {
   "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD3A228B_BDE2_CE1A_41D0_60C70DBAFFA9",
 "levels": [
  {
   "url": "media/panorama_BCFA218C_B294_5E0B_41E4_5B5935C50A1B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E09782_D6DC_5935_41D7_C9B1E7AA673F",
 "levels": [
  {
   "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E0D782_D6DC_5935_41D4_469FCF74BAA7",
 "levels": [
  {
   "url": "media/panorama_BCFC84D7_B294_2605_41C2_11E4DF9D718E_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ],
 "frameCount": 21
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD67B4C1_D65C_3CC9_41DF_42E8FCBD22DE",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6714C1_D65C_3CC9_41DA_6517331ACC12",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6494C1_D65C_3CC9_41E8_BBD8F6049317",
 "levels": [
  {
   "url": "media/panorama_BCFEE1F6_B294_3E06_41C0_9333187C9012_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C2E5677D_D6DC_59CE_41D1_8F831CD961FE",
 "levels": [
  {
   "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C3BBA740_D6FC_5DC7_41EA_8321075B01B4",
 "levels": [
  {
   "url": "media/panorama_BCF3B79B_B294_620E_41A2_229EBC1EEA34_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6F54CC_D65C_3CDF_41D0_756441293E6E",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6CB4CE_D65C_3CDB_41EA_97AC44AC5216",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6C34CE_D65C_3CDB_41E1_9A7E23409B26",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6DC4CF_D65C_3CD9_41C9_B6268FF52348",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 300
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6D34CF_D65C_3CD9_41E1_68565F040B04",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6A94CF_D65C_3CD9_41DA_34B352BC8EA2",
 "levels": [
  {
   "url": "media/panorama_BCF67E95_B294_6205_41E6_4008DC577345_0_HS_8_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6A04D0_D65C_3CC7_41BA_7A9391B8D1A2",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6B94D0_D65C_3CC7_41E8_D502E5AA6525",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6BF4D0_D65C_3CC7_41D8_9C0A2C14C8AA",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 640,
   "height": 300
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6B74D0_D65C_3CC7_41E5_36C7ECF45FEF",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6814D1_D65C_3CC9_41A6_3D1208D82953",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD69F4D1_D65C_3CC9_41E3_4B60CD2E8B14",
 "levels": [
  {
   "url": "media/panorama_BCFCE91F_B294_6E06_41E4_BEB998639147_0_HS_7_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CD6214C3_D65C_3CC9_41E6_BD51A34316D7",
 "levels": [
  {
   "url": "media/panorama_BCFD6B31_B297_E21A_41C0_D0F26854C68F_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 560,
   "height": 540
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F365BF6C_D657_CDDF_41D2_4B83ADFDC186",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F3653F6C_D657_CDDF_41E1_DE7B3A28029A",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1292A5_BDE2_CE0E_41B7_E241275F14B6",
 "levels": [
  {
   "url": "media/panorama_BCF60D80_B294_26FB_41DE_E1C0AC244273_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1DCD61E_D65C_3B4A_41D9_36F08F368204",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1DD661E_D65C_3B4A_41D0_D7FA48E3E68F",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_CF5AD6B0_D6AC_3B56_41E0_D69D5CADAF36",
 "levels": [
  {
   "url": "media/panorama_BCF25FBC_B294_220B_41E5_DA9B0A96D7C4_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C0D95842_D654_773A_41E1_A1209170CB30",
 "levels": [
  {
   "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C1DA561F_D65C_3B4A_41E4_F4E5D74BB75B",
 "levels": [
  {
   "url": "media/panorama_BCE199F0_B294_2E1B_41D1_E919D0034708_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F36C7F74_D657_CDC8_41DD_32036C85F117",
 "levels": [
  {
   "url": "media/panorama_BCEEE63F_B295_E205_41AE_5D89FCA238C3_0_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 800,
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_AD1C02A1_BDE2_CE06_41E1_41CA0867DE01",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F31EBF67_D657_CDC9_41D6_D02131C93BA1",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 1200,
   "height": 1800
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F31E0F67_D657_CDC9_41E3_800FBEA12B83",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0_HS_5_0.png",
   "class": "ImageResourceLevel",
   "width": 1080,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F361BF68_D657_CDC7_41B3_C46FA22B5362",
 "levels": [
  {
   "url": "media/panorama_BCE2538F_B294_E206_41DB_F1184638A5E0_0_HS_6_0.png",
   "class": "ImageResourceLevel",
   "width": 520,
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "horizontalAlign": "center",
 "data": {
  "name": "DropDown 2"
 },
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "width": 200,
 "class": "DropDown",
 "popUpPaddingLeft": 15,
 "fontFamily": "Montserrat",
 "paddingRight": 15,
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "fontColor": "#FFFFFF",
 "popUpPaddingTop": 10,
 "paddingLeft": 15,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "popUpShadow": false,
 "borderSize": 0,
 "minHeight": 1,
 "popUpFontColor": "#FFFFFF",
 "popUpShadowBlurRadius": 6,
 "arrowColor": "#FFFFFF",
 "popUpBorderRadius": 5,
 "popUpShadowOpacity": 0,
 "backgroundColor": [
  "#F7931E"
 ],
 "popUpShadowColor": "#000000",
 "height": "100%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": "16px",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "label": "ESCENAS",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "popUpPaddingBottom": 10,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "selectedPopUpBackgroundColor": "#CE6700",
 "propagateClick": false,
 "gap": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "textDecoration": "none",
 "popUpGap": 2,
 "shadow": false,
 "fontWeight": "bold",
 "popUpBackgroundColor": "#F7931E",
 "popUpBackgroundOpacity": 0
},
{
 "horizontalAlign": "center",
 "data": {
  "name": "DropDown 5"
 },
 "id": "DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09",
 "width": 200,
 "class": "DropDown",
 "popUpPaddingLeft": 15,
 "fontFamily": "Montserrat",
 "paddingRight": 15,
 "playList": "this.DropDown_057B3A27_3AA3_A1F2_41C0_6BB995D79A09_playlist",
 "fontColor": "#FFFFFF",
 "popUpPaddingTop": 10,
 "arrowColor": "#FFFFFF",
 "paddingLeft": 15,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "popUpShadow": false,
 "borderSize": 0,
 "minHeight": 1,
 "popUpFontColor": "#FFFFFF",
 "popUpShadowBlurRadius": 6,
 "pressedBackgroundColorRatios": [
  0
 ],
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "popUpShadowColor": "#000000",
 "height": 60,
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": "16px",
 "rollOverPopUpBackgroundColor": "#CE6700",
 "label": "PISCINA",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "popUpPaddingBottom": 10,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#CE6700"
 ],
 "selectedPopUpBackgroundColor": "#CE6700",
 "propagateClick": false,
 "gap": 0,
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "textDecoration": "none",
 "popUpGap": 2,
 "shadow": false,
 "fontWeight": "bold",
 "popUpBackgroundColor": "#F7931E",
 "popUpBackgroundOpacity": 0
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Settings"
 },
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "width": 60,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#CE6700"
 ],
 "fontFamily": "Arial",
 "iconHeight": 17,
 "paddingLeft": 0,
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "shadowBlurRadius": 6,
 "pressedRollOverIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed_rollover.png",
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "height": 60,
 "mode": "toggle",
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": 12,
 "borderColor": "#000000",
 "paddingTop": 0,
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "propagateClick": false,
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "gap": 5,
 "textDecoration": "none",
 "shadow": false,
 "iconWidth": 17,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "class": "Container",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "width": "85%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "width": 8,
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "orange line"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 50,
 "width": "50%",
 "contentOpaque": false,
 "paddingLeft": 50,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 460,
 "borderRadius": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "paddingBottom": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "scrollBarOpacity": 0.51,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "vertical",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxHeight": 60,
 "width": "25%",
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "pressedRollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed_rollover.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "height": "75%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "height": 140,
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "header"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "itemMode": "normal",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "class": "ThumbnailGrid",
 "itemLabelFontFamily": "Montserrat",
 "width": "100%",
 "itemMaxHeight": 1000,
 "paddingLeft": 70,
 "itemHorizontalAlign": "center",
 "itemBorderRadius": 0,
 "minHeight": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemLabelPosition": "bottom",
 "selectedItemLabelFontColor": "#F7931E",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "height": "92%",
 "backgroundOpacity": 0,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemPaddingLeft": 3,
 "itemThumbnailBorderRadius": 0,
 "minWidth": 1,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemWidth": 220,
 "itemBackgroundColor": [],
 "propagateClick": false,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "shadow": false,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "scrollBarMargin": 2,
 "horizontalAlign": "center",
 "itemLabelTextDecoration": "none",
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemLabelFontWeight": "normal",
 "rollOverItemThumbnailShadow": true,
 "borderSize": 0,
 "itemMinWidth": 50,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemHeight": 160,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 13,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "itemThumbnailHeight": 125,
 "borderRadius": 5,
 "itemBackgroundColorDirection": "vertical",
 "bottom": -0.2,
 "scrollBarColor": "#F7931E",
 "paddingTop": 10,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemPaddingBottom": 3,
 "itemThumbnailWidth": 220,
 "gap": 26,
 "itemPaddingRight": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelGap": 7,
 "paddingBottom": 70,
 "itemLabelFontStyle": "normal",
 "rollOverItemLabelFontColor": "#F7931E",
 "scrollBarVisible": "rollOver",
 "itemLabelHorizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "itemMaxWidth": 1000,
 "itemBackgroundOpacity": 0
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "insetBorder": false,
 "width": "100%",
 "class": "WebFrame",
 "scrollEnabled": true,
 "paddingRight": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "WebFrame48191"
 },
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxHeight": 60,
 "width": "25%",
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "height": "75%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "toolTipFontSize": "13px",
 "toolTipOpacity": 0.5,
 "id": "MapViewer",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 10,
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 1,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
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
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "shadow": false,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "borderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "displayTooltipInTouchScreens": true,
 "transitionDuration": 500,
 "toolTipPaddingTop": 20,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "height": 140,
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container photo"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "class": "Container",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "width": "55%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "middle",
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "width": 8,
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#F7931E"
 ],
 "backgroundOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "orange line"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 60,
 "width": "45%",
 "contentOpaque": false,
 "paddingLeft": 60,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 460,
 "borderRadius": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "paddingBottom": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "scrollBarOpacity": 0.51,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "vertical",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxHeight": 60,
 "width": "25%",
 "class": "IconButton",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "pressedRollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed_rollover.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "height": "75%",
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "class": "Image",
 "paddingRight": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "top": "0%",
 "height": "100%",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "photo"
 },
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "width": "100%",
 "class": "Container",
 "horizontalAlign": "right",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 0,
 "height": 60,
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 520,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 100,
 "borderRadius": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 30,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "scrollBarOpacity": 0.79,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "vertical",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "height": 40,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "right",
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "width": "100%",
 "class": "IconButton",
 "right": 20,
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "pressedRollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed_rollover.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "top": 20,
 "height": "36.14%",
 "mode": "push",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "right",
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "width": "100%",
 "class": "IconButton",
 "right": 20,
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "top": 20,
 "height": "36.14%",
 "mode": "push",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "toolTipFontSize": "13px",
 "toolTipOpacity": 0.5,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 10,
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "height": "100%",
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 1,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
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
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "shadow": false,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "borderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "displayTooltipInTouchScreens": true,
 "top": "0%",
 "toolTipPaddingTop": 20,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxHeight": 60,
 "width": "14.22%",
 "class": "IconButton",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed_rollover.png",
 "minHeight": 50,
 "top": "20%",
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "bottom": "20%",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxHeight": 60,
 "width": "14.22%",
 "class": "IconButton",
 "right": 10,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed_rollover.png",
 "minHeight": 50,
 "top": "20%",
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "bottom": "20%",
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "right",
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxHeight": 60,
 "width": "10%",
 "class": "IconButton",
 "right": 20,
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "pressedRollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed_rollover.jpg",
 "borderSize": 0,
 "minHeight": 50,
 "top": 20,
 "height": "10%",
 "mode": "push",
 "verticalAlign": "top",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "transparencyActive": false,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "class": "Image",
 "paddingRight": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "top": "0%",
 "height": "100%",
 "verticalAlign": "bottom",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "width": "100%",
 "class": "Container",
 "horizontalAlign": "right",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 0,
 "height": 60,
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 520,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "height": "100%",
 "minWidth": 100,
 "borderRadius": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 30,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "scrollBarOpacity": 0.79,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "vertical",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "width": 370,
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "height": 40,
 "backgroundOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "class": "HTMLText",
 "paddingRight": 10,
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "height": "100%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.54vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.68vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:1.68vh;font-family:'Montserrat';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.84vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.84vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.84vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.68vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;font-family:'Montserrat';\"><B>DONEC FEUGIAT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.47vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:1.68vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;font-family:'Montserrat';\"><B>LOREM IPSUM:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:2.62vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "data": {
  "name": "Button Lorem Ipsum"
 },
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "width": 180,
 "class": "Button",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "paddingRight": 0,
 "fontFamily": "Montserrat",
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 32,
 "paddingLeft": 0,
 "shadowBlurRadius": 6,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "layout": "horizontal",
 "height": 50,
 "backgroundOpacity": 0.8,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#F7931E"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "fontSize": "1.96vh",
 "borderColor": "#000000",
 "paddingTop": 0,
 "label": "LOREM IPSUM",
 "propagateClick": false,
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "textDecoration": "none",
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "width": "100%",
 "class": "HTMLText",
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "height": "45%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.54vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.46vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "class": "Container",
 "horizontalAlign": "left",
 "paddingRight": 0,
 "width": "100%",
 "contentOpaque": false,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "verticalAlign": "top",
 "height": "80%",
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "paddingBottom": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "- content"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "left",
 "maxWidth": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "maxHeight": 200,
 "width": "25%",
 "class": "Image",
 "paddingRight": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "height": "100%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "agent photo"
 },
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "width": "75%",
 "class": "HTMLText",
 "paddingRight": 10,
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "borderSize": 0,
 "minHeight": 1,
 "height": "100%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:1.99vh;font-family:'Montserrat';\"><B>JOHN DOE</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.47vh;font-family:'Montserrat';\">LICENSED REAL ESTATE SALESPERSON</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.84vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Montserrat';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.84vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.84vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.84vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver"
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "paddingBottom": 0,
 "desktopMipmappingEnabled": false,
 "data": {
  "name": "Player468"
 },
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "vrPolyfillScale": 0.5
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
