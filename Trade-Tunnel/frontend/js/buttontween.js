// Custom Code for the button animations with event listeners

var $buttonTween = document.querySelector('.buttonTween');
$buttonTween.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;
  TweenMax.to($buttonTween, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to($buttonTween, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to($buttonTween, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
});