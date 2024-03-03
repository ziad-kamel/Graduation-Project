import {
  helloVoid,
  helloError,
  helloStr,
  helloNum,
  helloArrayStr,
  helloObj,
} from "../utils/samples";
export { helloError, helloStr, helloNum, helloArrayStr, helloObj, helloVoid };

export const qeDomFunction = () => {
  if (typeof qe === "undefined") {
    app.enableQE();
  }
  if (qe) {
    qe.name;
    qe.project.getVideoEffectByName("test");
  }
};



var seq = app.project.activeSequence;
var audioTracks = seq.audioTracks;
var availibleClips = app.project.rootItem.children;

export const helloWorld = (
  numberClipToInsert: number,
  isaudio: boolean
)=> {

  var videoTrack = seq.videoTracks[0];
  var clipToInsert = availibleClips[numberClipToInsert]
  var audioTrack = seq.audioTracks[0];
  audioTracks = app.project.activeSequence.audioTracks;
    
  var dstTicks = seq.getPlayerPosition()
  if(isaudio){
    // check if the audio overlaps aith another audio clip in the same track
    for (var i = 0; i < audioTracks.numTracks; i++) {
      var track = audioTracks[i];
      // if the track is empty, insert the clip in the track
      if (track.clips.numItems == 0) {
        // alert("track number " + i + " is empty")
        track.insertClip(clipToInsert, dstTicks.seconds);
        return;
      }else if(track.clips.numItems == 1){
        // alert("track number " + i + " has one clip")
        // if the track has only one clip, check if the clip is before or after the current pos
        var firstClip = track.clips[0];
        if((firstClip.start.seconds > dstTicks.seconds + clipToInsert.getOutPoint().seconds) || (firstClip.end.seconds < dstTicks.seconds)){
          track.insertClip(clipToInsert, dstTicks.seconds);
          return;
        }
      }else if(track.clips.numItems == 2){
        // alert("track number " + i + " has two clips")
        // get the first and last clips in the track
        var firstClip = track.clips[0];
        var secondClip = track.clips[1];
        // check if the clips overlap at any point
        if(((dstTicks.seconds > firstClip.end.seconds) || (dstTicks.seconds + clipToInsert.getOutPoint().seconds < firstClip.start.seconds)) && ((dstTicks.seconds < secondClip.start.seconds && dstTicks.seconds + clipToInsert.getOutPoint().seconds < secondClip.start.seconds) || (dstTicks.seconds > secondClip.end.seconds))){
          track.insertClip(clipToInsert, dstTicks.seconds);
          return;
        }
      }
    }
        
    // if there is no empty track, insert the clip in the current track and overwrite the clip that is already there
    qe!.project.getActiveSequence().addTracks(0, 0, 1, 1);
    audioTrack = seq.audioTracks[0];
    audioTrack.insertClip(clipToInsert, dstTicks.seconds);
  }else
    videoTrack.insertClip(clipToInsert, dstTicks.seconds)
    
};

export const importAudioClip = (fileLocation: string[]) => {
  // check if the file is already imported
  for (var i = 0; i < availibleClips.numItems; i++) {
    if (availibleClips[i].name == fileLocation[1]) {
      // use the helloWorld function to insert the clip into the timeline
      helloWorld(i,true)
      alert("file already imported")
      return;
    }
  }
  app.project.importFiles([fileLocation[0]], true);
  helloWorld(availibleClips.numItems-1,true)
};