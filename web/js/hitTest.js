var collisions = new Array();

//initialize collisions

function collide()
{
	if (typeof scenes[0] !== 'undefined') {
		for(var i = 0 ; i < scenes[currScene].collisions.length ; i++)
		{
			//prepare possible entries for collision
			var colliders = new Array();
			var collidees = new Array();
			for(var j = 0 ; j < scenes[currScene].visuals.length ; j ++)
			{
				if(scenes[currScene].visuals[j].hitClass == scenes[currScene].collisions[i].collider)
				{
					colliders[colliders.length] = scenes[currScene].visuals[j];
				}
				if(scenes[currScene].visuals[j].hitClass == scenes[currScene].collisions[i].collidee)
				{
					collidees[collidees.length] = scenes[currScene].visuals[j];
				}
			}
			// check collision
			for(var j = 0 ; j < colliders.length ; j ++)
			{
				for(var k = 0 ; k < collidees.length ; k ++)
				{
					var intersection = ndgmr.checkRectCollision(colliders[j].bitmap,collidees[k].bitmap);
					if(intersection != null)
					{
						addEvent( "COLLISION" , scenes[currScene].collisions[i].event , intersection , colliders[j] , collidees[k] );
					} 
				}
			}

		}
	}
}