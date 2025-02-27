import { NextFunction, Request, Response, Router } from 'express'
import { CoreService } from '../../libs/core/core.services'
import { QuizController } from '../controllers/quiz-controller'
import { QuizService } from '../services'
import { FileManagerService } from '../../libs/filemanager/filemanager.service'

export class QuizRoutes {
  static async forRoot(coreService: CoreService): Promise<Router> {
    const quizService: QuizService = new QuizService()
    await quizService.init(coreService)
    const quizController: QuizController = new QuizController()
    await quizController.init(quizService)

    const router: Router = Router({ mergeParams: true })
    await router.get(
      '/ops/export',
      (req: Request, res: Response, next: NextFunction): Promise<void> => quizController.exportDatabase(req, res, next),
    )
    await router.get(
      '',
      (req: Request, res: Response, next: NextFunction): Promise<void> => quizController.quizList(req, res, next),
    )
    
    await router.get(
      '/:quizId',
      (req: Request, res: Response, next: NextFunction): Promise<void> => quizController.quizInfo(req, res, next),
    )
    await router.delete(
      '/:quizId',
      (req: Request, res: Response, next: NextFunction): Promise<void> => quizController.quizDelete(req, res, next),
    )
    await router.post(
      '',
      (req: Request, res: Response, next: NextFunction): Promise<void> => quizController.quizCreate(req, res, next),
    )
    
    return router
  }
}
